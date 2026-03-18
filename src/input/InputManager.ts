import Phaser from 'phaser';
import { DIRECTIONS, type Direction } from '../utils/constants';

type DirectionCallback = (dir: Direction) => void;
type ActionCallback = () => void;

export class InputManager {
  private scene: Phaser.Scene;
  private directionCallback?: DirectionCallback;
  private pauseCallback?: ActionCallback;
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.setupKeyboardInput();
    this.setupTouchInput();
    this.setupGamepadInput();
  }

  private setupKeyboardInput(): void {
    this.scene.input.keyboard?.on('keydown-UP', () => {
      this.directionCallback?.(DIRECTIONS.UP);
    });
    this.scene.input.keyboard?.on('keydown-DOWN', () => {
      this.directionCallback?.(DIRECTIONS.DOWN);
    });
    this.scene.input.keyboard?.on('keydown-LEFT', () => {
      this.directionCallback?.(DIRECTIONS.LEFT);
    });
    this.scene.input.keyboard?.on('keydown-RIGHT', () => {
      this.directionCallback?.(DIRECTIONS.RIGHT);
    });
    this.scene.input.keyboard?.on('keydown-SPACE', () => {
      this.pauseCallback?.();
    });
  }

  private setupTouchInput(): void {
    // Only show touch controls on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) return;

    const buttonSize = 50;
    const spacing = 10;
    const startY = this.scene.scale.height - 150;

    // Up button
    this.createTouchButton(
      this.scene.scale.width / 2,
      startY,
      '▲',
      () => this.directionCallback?.(DIRECTIONS.UP)
    );

    // Down button
    this.createTouchButton(
      this.scene.scale.width / 2,
      startY + buttonSize * 2 + spacing,
      '▼',
      () => this.directionCallback?.(DIRECTIONS.DOWN)
    );

    // Left button
    this.createTouchButton(
      this.scene.scale.width / 2 - buttonSize - spacing,
      startY + buttonSize + spacing,
      '◀',
      () => this.directionCallback?.(DIRECTIONS.LEFT)
    );

    // Right button
    this.createTouchButton(
      this.scene.scale.width / 2 + buttonSize + spacing,
      startY + buttonSize + spacing,
      '▶',
      () => this.directionCallback?.(DIRECTIONS.RIGHT)
    );
  }

  private createTouchButton(x: number, y: number, symbol: string, callback: () => void): Phaser.GameObjects.Text {
    const button = this.scene.add.text(x, y, symbol, {
      fontSize: '32px',
      color: '#ffffff',
      backgroundColor: '#2d7ef7',
      padding: { x: 15, y: 10 }
    })
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', callback);

    return button;
  }

  private setupGamepadInput(): void {
    this.scene.input.gamepad?.on('down', (_pad: Phaser.Input.Gamepad.Gamepad, button: Phaser.Input.Gamepad.Button) => {
      // D-Pad: 12=up, 13=down, 14=left, 15=right
      // Buttons: 0=A, 1=B, 2=X, 3=Y
      switch (button.index) {
        case 12:
          this.directionCallback?.(DIRECTIONS.UP);
          break;
        case 13:
          this.directionCallback?.(DIRECTIONS.DOWN);
          break;
        case 14:
          this.directionCallback?.(DIRECTIONS.LEFT);
          break;
        case 15:
          this.directionCallback?.(DIRECTIONS.RIGHT);
          break;
        case 9: // Start button
          this.pauseCallback?.();
          break;
      }
    });
  }

  onDirectionChange(callback: DirectionCallback): void {
    this.directionCallback = callback;
  }

  onPause(callback: ActionCallback): void {
    this.pauseCallback = callback;
  }
}
