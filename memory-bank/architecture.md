# 贪吃蛇游戏架构设计

## 1. 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                        游戏系统                              │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   渲染层      │  │   逻辑层      │  │   存储层      │     │
│  │  (Phaser)    │  │  (GameScene) │  │ (LocalStorage)│    │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         ↑                  ↑                  ↑            │
│  ┌──────────────────────────────────────────────────┐     │
│  │                   输入系统                         │     │
│  │  键盘 / 触摸 / 游戏手柄 / 无障碍阅读器            │     │
│  └──────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## 2. 模块设计

### 2.1 核心模块

| 模块 | 职责 | 文件 |
|------|------|------|
| Snake | 蛇的移动、生长、碰撞检测 | src/game/Snake.ts |
| Food | 食物生成、位置管理 | src/game/Food.ts |
| Grid | 网格系统、坐标转换 | src/game/Grid.ts |
| GameScene | 游戏主场景、状态管理 | src/game/GameScene.ts |
| InputManager | 输入处理（键盘/触摸/手柄） | src/input/InputManager.ts |
| HUD | 得分显示、等级显示 | src/ui/HUD.ts |
| StorageManager | 数据持久化 | src/storage/StorageManager.ts |
| Leaderboard | 排行榜管理 | src/storage/Leaderboard.ts |

### 2.2 游戏状态

```typescript
type GameState = 'initial' | 'ready' | 'running' | 'paused' | 'gameover';
```

状态转换：

```
[initial] --点击开始--> [ready] --首次移动--> [running]
    ↑                        |                      |
    |                        | <----暂停--------+   |
    |                        v                      v
    +-------[重开]--------[gameover] ---点击重开--+
```

## 3. 存储结构 (LocalStorage)

### 3.1 最高分

| Key | Type | Description |
|-----|------|-------------|
| `snake_high_score` | number | 最高分记录 |

### 3.2 游戏统计

| Key | Type | Description |
|-----|------|-------------|
| `snake_statistics` | JSON | 游戏统计数据 |

```typescript
interface GameStatistics {
  totalGames: number;      // 总游戏局数
  totalScore: number;      // 累计得分
  bestScore: number;       // 历史最高分
  totalTime: number;       // 累计游戏时间(ms)
  averageScore: number;    // 平均得分
  longestSnake: number;    // 最长蛇身长度
}
```

### 3.3 排行榜

| Key | Type | Description |
|-----|------|-------------|
| `snake_leaderboard` | JSON | 本地排行榜 Top 10 |

```typescript
interface LeaderboardEntry {
  rank: number;          // 排名
  score: number;         // 得分
  date: string;         // 日期 (ISO)
  playerName: string;   // 玩家名
}
```

### 3.4 设置

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `snake_settings` | JSON | 见下 | 游戏设置 |

```typescript
interface GameSettings {
  soundEnabled: boolean;     // 音效开关
  musicEnabled: boolean;     // 音乐开关
  vibrationEnabled: boolean; // 震动反馈
  difficulty: 'easy' | 'normal' | 'hard'; // 难度
}
```

## 4. 输入系统设计

### 4.1 支持的输入方式

| 输入方式 | 优先级 | 实现 |
|----------|--------|------|
| 键盘 | 1 | 方向键 / WASD / 空格 |
| 触摸 | 2 | 虚拟方向键 |
| 游戏手柄 | 3 | D-Pad / 方向按钮 |
| 无障碍 | 4 | 屏幕阅读器支持 |

### 4.2 方向映射

```typescript
const DIRECTION_MAP = {
  // 键盘
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },

  // 手柄
  12: { x: 0, y: -1 }, // D-Pad Up
  13: { x: 0, y: 1 },  // D-Pad Down
  14: { x: -1, y: 0 }, // D-Pad Left
  15: { x: 1, y: 0 },  // D-Pad Right
};
```

## 5. 无障碍设计 (Accessibility)

### 5.1 屏幕阅读器支持

- ARIA Live Region 用于分数播报
- 游戏状态变化时播报
- 蛇头位置可查询
- 食物位置可查询

### 5.2 键盘无障碍

- 完全支持键盘操作
- Tab 键可聚焦控制按钮

### 5.3 高对比度支持

```typescript
const ACCESSIBILITY_COLORS = {
  highContrast: {
    background: 0x000000,
    snakeHead: 0x00FF00,
    snakeBody: 0x00CC00,
    food: 0xFF0000,
    gridLine: 0x333333
  }
};
```

## 6. 响应式设计

### 6.1 断点

| 断点 | 宽度 | 布局 |
|------|------|------|
| mobile | < 400px | 垂直紧凑布局 |
| tablet | 400-768px | 标准布局 |
| desktop | > 768px | 宽屏布局 |

### 6.2 自适应网格

```typescript
function calculateGridSize(): { cols: number; rows: number } {
  const maxWidth = window.innerWidth * 0.95;
  const maxHeight = window.innerHeight * 0.7;
  const cellSize = 20;

  return {
    cols: Math.floor(maxWidth / cellSize),
    rows: Math.floor(maxHeight / cellSize)
  };
}
```

## 7. 部署目标

| 平台 | 技术 | 输出 |
|------|------|------|
| Web | Vite | dist/ |
| Android | Capacitor | .apk |
| iOS | Capacitor | .ipa |

---

**更新日志**:
- 2026-03-18: 初始版本，添加存储结构、输入系统、无障碍设计
