import Phaser from 'phaser';
import { GAME_CONFIG, type GameState } from '../utils/constants';
import { Snake } from './Snake';
import { Food } from './Food';
import { InputManager } from '../input/InputManager';
import { HUD } from '../ui/HUD';
import { GameOverModal } from '../ui/GameOverModal';
import { AccessibilityManager } from '../accessibility/AccessibilityManager';
import { StorageManager } from '../storage/StorageManager';

export class GameScene extends Phaser.Scene {
  private snake!: Snake;
  private food!: Food;
  private inputManager!: InputManager;
  private hud!: HUD;
  private gameOverModal!: GameOverModal;
  private accessibilityManager!: AccessibilityManager;
  private storageManager!: StorageManager;

  private cols: number = GAME_CONFIG.DEFAULT_COLS;
  private rows: number = GAME_CONFIG.DEFAULT_ROWS;
  private cellSize: number = GAME_CONFIG.CELL_SIZE;

  private score: number = 0;
  private speed: number = GAME_CONFIG.INITIAL_SPEED;
  private state: GameState = 'initial';

  private timerEvent?: Phaser.Time.TimerEvent;
  private gameStartTime: number = 0;

  // Graphics objects for rendering
  private snakeGraphics!: Phaser.GameObjects.Graphics;
  private foodGraphics!: Phaser.GameObjects.Graphics;
  private gridGraphics!: Phaser.GameObjects.Graphics;

  // Center offset
  private offsetX: number = 0;
  private offsetY: number = 0;

  constructor() {
    super({ key: 'GameScene' });
    this.storageManager = new StorageManager();
    this.accessibilityManager = new AccessibilityManager();
  }

  create(): void {
    this.calculateGridSize();
    this.initGameObjects();
    this.drawBackground();
    this.drawGrid();
    this.createUI();
    this.setupInput();
    this.setupInteraction();
  }

  private calculateGridSize(): void {
    const maxWidth = this.scale.width * 0.95;
    const maxHeight = this.scale.height * 0.75;

    this.cols = Math.max(
      GAME_CONFIG.MIN_COLS,
      Math.floor(maxWidth / this.cellSize)
    );
    this.rows = Math.max(
      GAME_CONFIG.MIN_ROWS,
      Math.floor(maxHeight / this.cellSize)
    );

    // Calculate offset to center the grid
    this.offsetX = (this.scale.width - this.cols * this.cellSize) / 2;
    this.offsetY = (this.scale.height - this.rows * this.cellSize) / 2 + 20;
  }

  private initGameObjects(): void {
    this.snake = new Snake(this.cols, this.rows);
    this.food = new Food(this.cols, this.rows);
  }

  private drawBackground(): void {
    this.add.rectangle(
      this.scale.width / 2,
      this.scale.height / 2,
      this.scale.width,
      this.scale.height,
      GAME_CONFIG.COLORS.BACKGROUND
    );
  }

  private drawGrid(): void {
    this.gridGraphics = this.add.graphics();

    // Draw grid border
    this.gridGraphics.lineStyle(2, GAME_CONFIG.COLORS.GRID_LINE, 1);
    this.gridGraphics.strokeRect(
      this.offsetX,
      this.offsetY,
      this.cols * this.cellSize,
      this.rows * this.cellSize
    );

    // Draw grid lines
    this.gridGraphics.lineStyle(1, GAME_CONFIG.COLORS.GRID_LINE, 0.3);

    // Vertical lines
    for (let x = 0; x <= this.cols; x++) {
      this.gridGraphics.lineBetween(
        this.offsetX + x * this.cellSize,
        this.offsetY,
        this.offsetX + x * this.cellSize,
        this.offsetY + this.rows * this.cellSize
      );
    }

    // Horizontal lines
    for (let y = 0; y <= this.rows; y++) {
      this.gridGraphics.lineBetween(
        this.offsetX,
        this.offsetY + y * this.cellSize,
        this.offsetX + this.cols * this.cellSize,
        this.offsetY + y * this.cellSize
      );
    }
  }

  private createUI(): void {
    this.hud = new HUD(this);
    this.hud.updateHighScore(this.storageManager.getHighScore());

    this.gameOverModal = new GameOverModal(this);
  }

  private setupInput(): void {
    this.inputManager = new InputManager(this);

    this.inputManager.onDirectionChange((dir) => {
      if (this.state === 'ready' || this.state === 'running') {
        if (this.state === 'ready') {
          this.startGame();
        }
        this.snake.setDirection(dir);
        this.accessibilityManager.announceDirection(dir);
      }
    });

    this.inputManager.onPause(() => {
      this.togglePause();
    });
  }

  private setupInteraction(): void {
    // Click/tap to start or restart
    this.input.on('pointerdown', () => {
      if (this.state === 'initial' || this.state === 'ready') {
        this.startGame();
      } else if (this.state === 'gameover') {
        this.restartGame();
      }
    });
  }

  private startGame(): void {
    this.snake.reset();
    this.food.respawn(this.snake.getBody());
    this.score = 0;
    this.speed = GAME_CONFIG.INITIAL_SPEED;
    this.state = 'running';
    this.gameStartTime = Date.now();

    this.hud.updateScore(0);
    this.hud.updateSpeed(this.speed);
    this.accessibilityManager.announceGameState('running');

    this.scheduleStep();
    this.drawGame();
  }

  private scheduleStep(): void {
    if (this.timerEvent) {
      this.timerEvent.remove();
    }

    this.timerEvent = this.time.addEvent({
      delay: this.speed,
      callback: this.step,
      callbackScope: this,
      loop: false
    });
  }

  private step = (): void => {
    if (this.state !== 'running') return;

    const newHead = this.snake.move();
    const collision = this.snake.checkCollision();

    if (collision) {
      this.accessibilityManager.announceCollision(collision);
      this.gameOver();
      return;
    }

    if (this.food.checkCollision(newHead)) {
      this.score += GAME_CONFIG.FOOD_SCORE;
      this.accessibilityManager.announceFoodEaten();
      this.accessibilityManager.announceScore(this.score);
      this.snake.grow();

      // Increase speed
      if (this.speed > GAME_CONFIG.MIN_SPEED) {
        this.speed -= GAME_CONFIG.SPEED_DECREASE;
      }

      this.hud.updateScore(this.score);
      this.hud.updateSpeed(this.speed);
      this.food.respawn(this.snake.getBody());
    }

    this.drawGame();
    this.scheduleStep();
  };

  private drawGame(): void {
    // Clear previous graphics
    if (this.snakeGraphics) {
      this.snakeGraphics.destroy();
    }
    if (this.foodGraphics) {
      this.foodGraphics.destroy();
    }

    // Draw snake
    this.snakeGraphics = this.add.graphics();
    const body = this.snake.getBody();

    body.forEach((pos, index) => {
      const color = index === 0 ? GAME_CONFIG.COLORS.SNAKE_HEAD : GAME_CONFIG.COLORS.SNAKE_BODY;
      this.snakeGraphics.fillStyle(color, 1);
      this.snakeGraphics.fillRect(
        this.offsetX + pos.x * this.cellSize + 1,
        this.offsetY + pos.y * this.cellSize + 1,
        this.cellSize - 2,
        this.cellSize - 2
      );
    });

    // Draw food
    this.foodGraphics = this.add.graphics();
    const foodPos = this.food.getPosition();
    this.foodGraphics.fillStyle(GAME_CONFIG.COLORS.FOOD, 1);
    this.foodGraphics.fillCircle(
      this.offsetX + foodPos.x * this.cellSize + this.cellSize / 2,
      this.offsetY + foodPos.y * this.cellSize + this.cellSize / 2,
      this.cellSize / 2 - 2
    );
  }

  private togglePause(): void {
    if (this.state === 'running') {
      this.pauseGame();
    } else if (this.state === 'paused') {
      this.resumeGame();
    }
  }

  private pauseGame(): void {
    this.state = 'paused';
    if (this.timerEvent) {
      this.timerEvent.remove();
    }
    this.accessibilityManager.announceGameState('paused');
  }

  private resumeGame(): void {
    this.state = 'running';
    this.accessibilityManager.announceGameState('running');
    this.scheduleStep();
  }

  private gameOver(): void {
    this.state = 'gameover';
    if (this.timerEvent) {
      this.timerEvent.remove();
    }

    const highScore = this.storageManager.getHighScore();
    const isNewHighScore = this.score > highScore;

    // Update storage
    this.storageManager.setHighScore(this.score);
    const gameTime = Date.now() - this.gameStartTime;
    this.storageManager.updateStatistics(this.score, gameTime, this.snake.getLength());

    this.accessibilityManager.setLastScore(this.score);
    this.accessibilityManager.announceGameState('gameover');

    // Show game over modal
    this.gameOverModal.show(
      this.score,
      Math.max(this.score, highScore),
      isNewHighScore,
      () => this.restartGame()
    );

    // Update high score display
    this.hud.updateHighScore(Math.max(this.score, highScore));
  }

  private restartGame(): void {
    this.snake.reset();
    this.food.respawn(this.snake.getBody());
    this.score = 0;
    this.speed = GAME_CONFIG.INITIAL_SPEED;
    this.state = 'ready';

    this.hud.updateScore(0);
    this.hud.updateSpeed(this.speed);

    this.drawGame();
    this.accessibilityManager.announceGameState('ready');
  }
}
