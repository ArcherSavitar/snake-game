# 贪吃蛇游戏实施计划

## 项目概述

基于 game-design-document.md 和 tech-stack.md，将现有贪吃蛇游戏重构为现代化 Web 游戏。

---

## 阶段一：项目搭建 (Day 0.5)

### 1.1 环境初始化

```bash
# 创建 Vite + TypeScript 项目
npm create vite@latest snake-game -- --template vanilla-ts

# 进入项目目录
cd snake-game

# 安装 Phaser 3
npm install phaser
```

### 1.2 项目结构创建

```
snake-game/
├── src/
│   ├── game/
│   │   ├── Snake.ts
│   │   ├── Food.ts
│   │   ├── Grid.ts
│   │   ├── GameScene.ts
│   │   └── GameController.ts
│   ├── ui/
│   │   ├── HUD.ts
│   │   └── GameOverModal.ts
│   ├── input/
│   │   └── InputManager.ts
│   ├── utils/
│   │   └── constants.ts
│   └── main.ts
├── public/
│   └── assets/
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

### 1.3 配置 TypeScript

```json
// tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}
```

---

## 阶段二：核心游戏引擎 + 场景 (Day 1.5)

### 2.1 常量定义

**文件**: `src/utils/constants.ts`

```typescript
export const GAME_CONFIG = {
  // 网格配置
  DEFAULT_COLS: 20,
  DEFAULT_ROWS: 20,
  MIN_COLS: 8,
  MIN_ROWS: 8,
  CELL_SIZE: 20,

  // 速度配置 (ms)
  INITIAL_SPEED: 120,
  MIN_SPEED: 60,
  SPEED_DECREASE: 4,

  // 得分配置
  FOOD_SCORE: 10,

  // 颜色配置
  COLORS: {
    BACKGROUND: 0x1a1a2e,
    GRID_LINE: 0x16213e,
    SNAKE_HEAD: 0x2ecc71,
    SNAKE_BODY: 0x27ae60,
    FOOD: 0xe74c3c,
    UI_PRIMARY: 0x2d7ef7,
    TEXT: '#eeeeee'
  }
} as const;
```

### 2.2 蛇类实现

**文件**: `src/game/Snake.ts`

```typescript
import { GAME_CONFIG } from '../utils/constants';

interface Position {
  x: number;
  y: number;
}

interface Direction {
  x: number;
  y: number;
}

export class Snake {
  private body: Position[] = [];
  private direction: Direction = { x: 1, y: 0 };
  private nextDirection: Direction = { x: 1, y: 0 };
  private growPending: number = 0;
  private cols: number;
  private rows: number;

  constructor(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;
    this.reset();
  }

  reset(): void {
    this.body = [{
      x: Math.floor(this.cols / 2),
      y: Math.floor(this.rows / 2)
    }];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.growPending = 0;
  }

  setDirection(dir: Direction): void {
    // 防止反向移动
    if (this.body.length > 1) {
      const head = this.body[0];
      const second = this.body[1];
      if (head.x + dir.x === second.x && head.y + dir.y === second.y) {
        return;
      }
    }
    this.nextDirection = dir;
  }

  move(): Position {
    this.direction = this.nextDirection;
    const head = this.body[0];
    const newHead = {
      x: head.x + this.direction.x,
      y: head.y + this.direction.y
    };

    this.body.unshift(newHead);

    if (this.growPending > 0) {
      this.growPending--;
    } else {
      this.body.pop();
    }

    return newHead;
  }

  grow(amount: number = 1): void {
    this.growPending += amount;
  }

  getHead(): Position {
    return this.body[0];
  }

  getBody(): Position[] {
    return [...this.body];
  }

  checkCollision(): 'wall' | 'body' | null {
    const head = this.body[0];

    // 墙壁碰撞
    if (head.x < 0 || head.x >= this.cols || head.y < 0 || head.y >= this.rows) {
      return 'wall';
    }

    // 自身碰撞 (从第4节身体开始检测)
    for (let i = 4; i < this.body.length; i++) {
      if (this.body[i].x === head.x && this.body[i].y === head.y) {
        return 'body';
      }
    }

    return null;
  }
}
```

### 2.3 食物类实现

**文件**: `src/game/Food.ts`

```typescript
import { GAME_CONFIG } from '../utils/constants';

interface Position {
  x: number;
  y: number;
}

export class Food {
  private position: Position = { x: 0, y: 0 };
  private cols: number;
  private rows: number;

  constructor(cols: number, rows: number) {
    this.cols = cols;
    this.rows = rows;
    this.respawn([]);
  }

  respawn(occupiedPositions: Position[]): void {
    let newPosition: Position;

    do {
      newPosition = {
        x: Math.floor(Math.random() * this.cols),
        y: Math.floor(Math.random() * this.rows)
      };
    } while (occupiedPositions.some(p => p.x === newPosition.x && p.y === newPosition.y));

    this.position = newPosition;
  }

  getPosition(): Position {
    return { ...this.position };
  }

  checkCollision(head: Position): boolean {
    return head.x === this.position.x && head.y === this.position.y;
  }
}
```

---

## 阶段三：UI 界面 + 无障碍 (Day 1)

### 3.1 输入管理器 (键盘 + 触摸 + 游戏手柄)

**文件**: `src/input/InputManager.ts`

```typescript
import Phaser from 'phaser';

type DirectionCallback = (dir: { x: number; y: number }) => void;
type ActionCallback = () => void;

export class InputManager {
  private scene: Phaser.Scene;
  private directionCallback?: DirectionCallback;
  private pauseCallback?: ActionCallback;
  private gamepad?: Gamepad;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.setupKeyboardInput();
    this.setupTouchInput();
    this.setupGamepadInput();
  }

  private setupKeyboardInput(): void {
    this.scene.input.keyboard?.on('keydown-UP', () => {
      this.directionCallback?.({ x: 0, y: -1 });
    });
    this.scene.input.keyboard?.on('keydown-DOWN', () => {
      this.directionCallback?.({ x: 0, y: 1 });
    });
    this.scene.input.keyboard?.on('keydown-LEFT', () => {
      this.directionCallback?.({ x: -1, y: 0 });
    });
    this.scene.input.keyboard?.on('keydown-RIGHT', () => {
      this.directionCallback?.({ x: 1, y: 0 });
    });
    this.scene.input.keyboard?.on('keydown-SPACE', () => {
      this.pauseCallback?.();
    });
  }

  private setupTouchInput(): void {
    // 虚拟方向键实现
  }

  private setupGamepadInput(): void {
    this.scene.input.gamepad?.on('down', (pad: Phaser.Input.Gamepad.Gamepad, button: Phaser.Input.Gamepad.Button) => {
      // D-Pad 方向按钮 (12=上, 13=下, 14=左, 15=右)
      // 动作按钮 (0=A, 1=B, 2=X, 3=Y)
      switch (button.index) {
        case 12: this.directionCallback?.({ x: 0, y: -1 }); break;
        case 13: this.directionCallback?.({ x: 0, y: 1 }); break;
        case 14: this.directionCallback?.({ x: -1, y: 0 }); break;
        case 15: this.directionCallback?.({ x: 1, y: 0 }); break;
        case 9: this.pauseCallback?.(); break; // Start 按钮
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
```

### 3.2 无障碍支持 (屏幕阅读器)

**文件**: `src/accessibility/AccessibilityManager.ts`

```typescript
export class AccessibilityManager {
  private liveRegion: HTMLElement;
  private announceQueue: string[] = [];
  private isAnnouncing: boolean = false;

  constructor() {
    this.liveRegion = this.createLiveRegion();
    document.body.appendChild(this.liveRegion);
  }

  private createLiveRegion(): HTMLElement {
    const region = document.createElement('div');
    region.setAttribute('role', 'status');
    region.setAttribute('aria-live', 'polite');
    region.setAttribute('aria-atomic', 'true');
    region.className = 'sr-only';
    region.style.cssText = `
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    `;
    return region;
  }

  announce(message: string): void {
    this.announceQueue.push(message);
    if (!this.isAnnouncing) {
      this.processQueue();
    }
  }

  private processQueue(): void {
    if (this.announceQueue.length === 0) {
      this.isAnnouncing = false;
      return;
    }

    this.isAnnouncing = true;
    const message = this.announceQueue.shift();
    this.liveRegion.textContent = message;

    setTimeout(() => this.processQueue(), 300);
  }

  announceScore(score: number): void {
    this.announce(`得分: ${score}`);
  }

  announceGameState(state: string): void {
    const stateMessages: Record<string, string> = {
      ready: '游戏准备就绪，按方向键开始',
      running: '游戏进行中',
      paused: '游戏已暂停',
      gameover: `游戏结束，得分: ${this.lastScore}`
    };
    this.announce(stateMessages[state] || state);
  }

  announceDirection(dir: { x: number; y: number }): void {
    const directionNames: Record<string, string> = {
      '0,-1': '上',
      '0,1': '下',
      '-1,0': '左',
      '1,0': '右'
    };
    const key = `${dir.x},${dir.y}`;
    this.announce(`蛇向${directionNames[key]}移动`);
  }

  private lastScore: number = 0;
  setLastScore(score: number): void {
    this.lastScore = score;
  }
}
```

### 3.2 游戏主场景

**文件**: `src/game/GameScene.ts`

```typescript
import Phaser from 'phaser';
import { GAME_CONFIG } from '../utils/constants';
import { Snake } from './Snake';
import { Food } from './Food';
import { InputManager } from '../input/InputManager';

type GameState = 'initial' | 'running' | 'paused' | 'gameover';

export class GameScene extends Phaser.Scene {
  private snake!: Snake;
  private food!: Food;
  private inputManager!: InputManager;

  private cols: number = GAME_CONFIG.DEFAULT_COLS;
  private rows: number = GAME_CONFIG.DEFAULT_ROWS;
  private cellSize: number = GAME_CONFIG.CELL_SIZE;

  private score: number = 0;
  private speed: number = GAME_CONFIG.INITIAL_SPEED;
  private state: GameState = 'initial';

  private timerEvent?: Phaser.Time.TimerEvent;
  private scoreText!: Phaser.GameObjects.Text;
  private stateText!: Phaser.GameObjects.Text;

  constructor() {
    super({ key: 'GameScene' });
  }

  create(): void {
    this.calculateGridSize();
    this.snake = new Snake(this.cols, this.rows);
    this.food = new Food(this.cols, this.rows);

    this.drawBackground();
    this.drawGrid();
    this.createUI();
    this.setupInput();
  }

  private calculateGridSize(): void {
    const maxWidth = this.scale.width * 0.95;
    const maxHeight = this.scale.height * 0.7;

    this.cols = Math.max(
      GAME_CONFIG.MIN_COLS,
      Math.floor(maxWidth / this.cellSize)
    );
    this.rows = Math.max(
      GAME_CONFIG.MIN_ROWS,
      Math.floor(maxHeight / this.cellSize)
    );
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
    const offsetX = (this.scale.width - this.cols * this.cellSize) / 2;
    const offsetY = (this.scale.height - this.rows * this.cellSize) / 2;

    this.add.rectangle(
      offsetX + (this.cols * this.cellSize) / 2,
      offsetY + (this.rows * this.cellSize) / 2,
      this.cols * this.cellSize,
      this.rows * this.cellSize,
      0x000000,
      0.3
    ).setStrokeStyle(1, GAME_CONFIG.COLORS.GRID_LINE);
  }

  private createUI(): void {
    this.scoreText = this.add.text(20, 20, '得分: 0', {
      fontSize: '24px',
      color: GAME_CONFIG.COLORS.TEXT,
      fontFamily: 'Arial'
    });

    this.stateText = this.add.text(
      this.scale.width / 2,
      this.scale.height / 2,
      '点击开始游戏',
      {
        fontSize: '32px',
        color: GAME_CONFIG.COLORS.TEXT,
        fontFamily: 'Arial'
      }
    ).setOrigin(0.5);
  }

  private setupInput(): void {
    this.inputManager = new InputManager(this);

    this.inputManager.onDirectionChange((dir) => {
      if (this.state === 'running') {
        this.snake.setDirection(dir);
      }
    });

    this.inputManager.onPause(() => {
      this.togglePause();
    });

    // 点击开始/继续
    this.input.on('pointerdown', () => {
      if (this.state === 'initial' || this.state === 'gameover') {
        this.startGame();
      } else if (this.state === 'paused') {
        this.resumeGame();
      }
    });
  }

  private startGame(): void {
    this.snake.reset();
    this.food.respawn(this.snake.getBody());
    this.score = 0;
    this.speed = GAME_CONFIG.INITIAL_SPEED;
    this.state = 'running';

    this.scoreText.setText('得分: 0');
    this.stateText.setVisible(false);

    this.scheduleStep();
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

  private step(): void {
    if (this.state !== 'running') return;

    const newHead = this.snake.move();
    const collision = this.snake.checkCollision();

    if (collision) {
      this.gameOver();
      return;
    }

    if (this.food.checkCollision(newHead)) {
      this.score += GAME_CONFIG.FOOD_SCORE;
      this.scoreText.setText(`得分: ${this.score}`);
      this.snake.grow();

      // 速度递增
      if (this.speed > GAME_CONFIG.MIN_SPEED) {
        this.speed -= GAME_CONFIG.SPEED_DECREASE;
      }

      this.food.respawn(this.snake.getBody());
    }

    this.draw();
    this.scheduleStep();
  }

  private draw(): void {
    // 清除并重绘蛇和食物
    // 使用 Phaser Graphics 或 Sprites
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
    this.stateText.setText('已暂停\n点击继续').setVisible(true);
    if (this.timerEvent) {
      this.timerEvent.remove();
    }
  }

  private resumeGame(): void {
    this.state = 'running';
    this.stateText.setVisible(false);
    this.scheduleStep();
  }

  private gameOver(): void {
    this.state = 'gameover';
    if (this.timerEvent) {
      this.timerEvent.remove();
    }
    this.stateText.setText(`游戏结束\n得分: ${this.score}\n点击重新开始`).setVisible(true);
  }
}
```

---

## 阶段四：视觉效果 + 手柄支持 (Day 1)

### 4.1 HUD 界面

**文件**: `src/ui/HUD.ts`

```typescript
import Phaser from 'phaser';
import { GAME_CONFIG } from '../utils/constants';

export class HUD {
  private scene: Phaser.Scene;
  private scoreText!: Phaser.GameObjects.Text;
  private levelText!: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.create();
  }

  private create(): void {
    // 得分显示
    this.scoreText = this.scene.add.text(20, 20, '得分: 0', {
      fontSize: '24px',
      color: '#ffffff',
      fontFamily: 'Arial'
    });

    // 等级显示
    this.levelText = this.scene.add.text(20, 50, '速度: 1', {
      fontSize: '18px',
      color: '#aaaaaa',
      fontFamily: 'Arial'
    });
  }

  updateScore(score: number): void {
    this.scoreText.setText(`得分: ${score}`);
  }

  updateLevel(speed: number): void {
    const level = Math.floor((GAME_CONFIG.INITIAL_SPEED - speed) / 10) + 1;
    this.levelText.setText(`速度: ${level}`);
  }
}
```

### 4.2 游戏结束弹窗

**文件**: `src/ui/GameOverModal.ts`

```typescript
import Phaser from 'phaser';

export class GameOverModal {
  private scene: Phaser.Scene;
  private container!: Phaser.GameObjects.Container;
  private onRestart?: () => void;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  show(score: number, highScore: number, onRestart: () => void): void {
    this.onRestart = onRestart;

    // 半透明遮罩
    const overlay = this.scene.add.rectangle(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2,
      this.scene.scale.width,
      this.scene.scale.height,
      0x000000,
      0.7
    );

    // 游戏结束文本
    const titleText = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 - 80,
      '游戏结束',
      {
        fontSize: '48px',
        color: '#ffffff',
        fontFamily: 'Arial',
        fontStyle: 'bold'
      }
    ).setOrigin(0.5);

    // 分数显示
    const scoreText = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2,
      `得分: ${score}`,
      {
        fontSize: '32px',
        color: '#ffffff',
        fontFamily: 'Arial'
      }
    ).setOrigin(0.5);

    // 最高分
    const highScoreText = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 + 40,
      `最高分: ${highScore}`,
      {
        fontSize: '24px',
        color: '#aaaaaa',
        fontFamily: 'Arial'
      }
    ).setOrigin(0.5);

    // 重新开始按钮
    const restartBtn = this.scene.add.text(
      this.scene.scale.width / 2,
      this.scene.scale.height / 2 + 120,
      '重新开始',
      {
        fontSize: '24px',
        color: '#ffffff',
        backgroundColor: '#2d7ef7',
        padding: { x: 20, y: 10 },
        fontFamily: 'Arial'
      }
    )
      .setOrigin(0.5)
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        this.hide();
        onRestart();
      });

    this.container = this.scene.add.container(0, 0, [
      overlay,
      titleText,
      scoreText,
      highScoreText,
      restartBtn
    ]);
  }

  hide(): void {
    this.container?.setVisible(false);
  }
}
```

---

## 阶段五：持久化 + 统计 (Day 0.5)

### 5.1 动画效果

| 效果 | 实现方式 | 优先级 |
|------|----------|--------|
| 蛇移动平滑 | Lerp 插值 | 高 |
| 吃到食物 | 缩放弹跳 + 粒子 | 高 |
| 游戏结束 | 屏幕震动 + 淡出 | 中 |
| 食物生成 | 淡入效果 | 低 |
| 分数变化 | 数字滚动动画 | 低 |

### 5.2 粒子系统

```typescript
// 吃到食物时的粒子效果
private createEatEffect(x: number, y: number): void {
  const particles = this.add.particles(x, y, 'particle', {
    speed: { min: 50, max: 150 },
    angle: { min: 0, max: 360 },
    scale: { start: 0.5, end: 0 },
    lifespan: 300,
    gravityY: 100,
    quantity: 10,
    emitting: false
  });

  particles.explode();
}
```

### 5.3 音效 (可选)

```typescript
// 音效预加载
preload(): void {
  this.load.audio('eat', 'assets/sounds/eat.mp3');
  this.load.audio('gameover', 'assets/sounds/gameover.mp3');
  this.load.audio('move', 'assets/sounds/move.mp3');
}
```

---

## 阶段六：测试 + 部署 (Day 0.5)

### 6.1 本地存储

```typescript
// 本地存储管理器
export class StorageManager {
  private readonly HIGH_SCORE_KEY = 'snake_high_score';

  getHighScore(): number {
    return Number(localStorage.getItem(this.HIGH_SCORE_KEY)) || 0;
  }

  setHighScore(score: number): void {
    const current = this.getHighScore();
    if (score > current) {
      localStorage.setItem(this.HIGH_SCORE_KEY, String(score));
    }
  }

  getStatistics(): GameStatistics {
    const data = localStorage.getItem('snake_statistics');
    return data ? JSON.parse(data) : {
      totalGames: 0,
      totalScore: 0,
      bestScore: 0,
      totalTime: 0
    };
  }

  updateStatistics(score: number, timeMs: number): void {
    const stats = this.getStatistics();
    stats.totalGames++;
    stats.totalScore += score;
    stats.bestScore = Math.max(stats.bestScore, score);
    stats.totalTime += timeMs;
    localStorage.setItem('snake_statistics', JSON.stringify(stats));
  }
}
```

### 6.2 排行榜

```typescript
interface LeaderboardEntry {
  rank: number;
  score: number;
  date: string;
  playerName: string;
}

// 本地排行榜 (Top 10)
export class Leaderboard {
  private readonly STORAGE_KEY = 'snake_leaderboard';
  private readonly MAX_ENTRIES = 10;

  getEntries(): LeaderboardEntry[] {
    const data = localStorage.getItem(this.STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  addEntry(name: string, score: number): number {
    const entries = this.getEntries();
    const entry: LeaderboardEntry = {
      rank: 0,
      score,
      date: new Date().toISOString(),
      playerName: name
    };

    entries.push(entry);
    entries.sort((a, b) => b.score - a.score);
    const topEntries = entries.slice(0, this.MAX_ENTRIES);

    // 更新排名
    topEntries.forEach((e, i) => e.rank = i + 1);

    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(topEntries));

    const rank = topEntries.findIndex(e => e.score === score && e.date === entry.date);
    return rank >= 0 ? rank + 1 : -1;
  }
}
```

---

## (测试已合并到阶段六)

### 7.1 单元测试

```bash
# 安装测试框架
npm install --save-dev vitest @testing-library/phaser
```

| 测试用例 | 覆盖内容 |
|----------|----------|
| Snake.move() | 移动逻辑、方向改变、防反向 |
| Snake.checkCollision() | 墙壁碰撞、自身碰撞 |
| Food.respawn() | 食物不生成在蛇身上 |
| GameController | 状态转换、得分计算 |

### 7.2 E2E 测试

```typescript
// 使用 Playwright
import { test, expect } from '@playwright/test';

test('游戏流程', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // 点击开始
  await page.click('text=开始');

  // 等待游戏运行
  expect(page.locator('#score')).not.toBeEmpty();

  // 验证蛇可以移动
  const initialHead = await page.locator('.snake-head').first();
  await page.keyboard.press('ArrowRight');
  // 验证位置变化
});
```

---

## (部署已合并到阶段六)

### 8.1 Web 部署

```bash
# 构建生产版本
npm run build

# 输出目录: dist/
# 部署到静态托管 (Netlify / Vercel / GitHub Pages)
```

### 8.2 Android 打包 (可选)

```bash
# 使用 Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

npx cap add android
npx cap sync
npx cap open android
```

---

## 任务清单汇总

| 阶段 | 任务 | 预估时间 |
|------|------|----------|
| 一 | 项目搭建 | 0.5天 |
| 二 | 核心引擎 + 场景 | 1.5天 |
| 三 | UI 界面 + 无障碍 | 1天 |
| 四 | 视觉效果 + 手柄支持 | 1天 |
| 五 | 持久化 + 统计 | 0.5天 |
| 六 | 测试 + 部署 | 0.5天 |

**总工期**: 约 5 天 (紧凑)

---

## 里程碑

- [ ] **M1** (Day 2): 蛇可以移动、吃食物、碰撞检测
- [ ] **M3** (Day 3): UI 和无障碍支持完成
- [ ] **M4** (Day 4): 视觉效果 + 手柄支持完成
- [ ] **M5** (Day 5): 全部功能 + 部署完成
