# 贪吃蛇游戏技术栈推荐

## 推荐的现代 Web 游戏技术栈

```
┌─────────────────────────────────────────────────────────┐
│                    推荐技术栈                            │
├─────────────────────────────────────────────────────────┤
│  游戏框架:  Phaser 3  /  PixiJS  /  Three.js           │
│  开发语言:  TypeScript                                    │
│  构建工具:  Vite  /  Parcel                              │
│  包管理器:  npm  /  pnpm                                 │
└─────────────────────────────────────────────────────────┘
```

---

## 1. 核心框架

### 首选方案: Phaser 3

| 特性 | 说明 |
|------|------|
| 2D 游戏引擎 | 专为 2D 游戏设计，内置物理、动画、输入系统 |
| 渲染性能 | WebGL + Canvas 自动降级 |
| 社区活跃 | 文档完善，示例丰富 |
| 许可 | MIT 免费商用 |

**替代方案:**
- **PixiJS**: 更轻量，适合高性能渲染需求
- **Three.js**: 如需 3D 贪吃蛇效果

---

## 2. 开发语言

### TypeScript (强推)

```
优势:
├── 类型安全 → 减少运行时错误
├── 代码提示 → 开发效率提升
├── 重构友好 → 大型项目维护
└── 生态完善 → 与所有主流框架兼容
```

---

## 3. 项目架构

```
snake-game/
├── src/
│   ├── game/           # 游戏逻辑
│   │   ├── Snake.ts    # 蛇类
│   │   ├── Food.ts     # 食物类
│   │   ├── Grid.ts     # 网格系统
│   │   └── Game.ts     # 主游戏类
│   ├── scene/          # 场景
│   │   └── MainScene.ts
│   ├── ui/             # UI 组件
│   │   └── HUD.ts
│   └── main.ts         # 入口
├── public/             # 静态资源
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 4. 游戏功能模块设计

### 4.1 蛇 (Snake)

```typescript
interface Position { x: number; y: number }
interface Direction { x: number; y: number }

class Snake {
  body: Position[]      // 蛇身坐标数组
  direction: Direction  // 当前移动方向
  nextDirection: Direction // 下帧方向 (防反向)
  growPending: number   // 待生长长度

  move(): void
  grow(amount: number): void
  changeDirection(dir: Direction): void
  checkCollision(): boolean
  getHead(): Position
}
```

### 4.2 食物 (Food)

```typescript
class Food {
  position: Position
  type: FoodType        // 普通/奖励/障碍

  respawn(availablePositions: Position[]): void
  draw(renderer: Renderer): void
}
```

### 4.3 游戏控制器 (GameController)

```typescript
class GameController {
  state: GameState      // READY | RUNNING | PAUSED | GAMEOVER
  score: number
  speed: number
  level: number

  start(): void
  pause(): void
  resume(): void
  restart(): void
  update(deltaTime: number): void
}
```

### 4.4 输入系统 (InputManager)

```typescript
class InputManager {
  // 支持: 键盘 / 触屏 / 游戏手柄
  onDirectionChange(callback: (dir: Direction) => void): void
  onPause(callback: () => void): void
}
```

---

## 5. 响应式与适配

```typescript
// 画布尺寸自适应
function resizeCanvas(): void {
  const maxWidth = window.innerWidth * 0.95
  const maxHeight = window.innerHeight * 0.7
  const cellSize = 20

  cols = Math.floor(maxWidth / cellSize)
  rows = Math.floor(maxHeight / cellSize)
}
```

---

## 6. 性能优化

| 优化点 | 方案 |
|--------|------|
| 渲染 | 使用 Object Pool 复用食物/粒子 |
| 更新 | 固定时间步长 (Fixed Timestep) |
| 输入 | 方向输入防抖，防止一帧内多次转向 |
| 内存 | 避免每帧创建新对象 |

---

## 7. 动画与视觉

### 建议效果
- 蛇身移动: 线性插值 (Lerp) 平滑过渡
- 吃到食物: 缩放弹跳动画 + 粒子特效
- 游戏结束: 屏幕震动 + 淡出效果
- UI: 分数滚动数字、按钮悬停反馈

### 配色参考

```
蛇头:  #2ecc71  (明亮绿)
蛇身:  #27ae60  (深绿)
食物:  #e74c3c  (珊瑚红)
背景:  #1a1a2e  (深蓝黑)
网格线: #16213e  (暗蓝)
高亮:  #0f3460  (靛蓝)
```

---

## 8. 平台部署

| 平台 | 方案 |
|------|------|
| Web | Vite 构建 → 静态托管 |
| Android | Capacitor / Cordova 打包 |
| iOS | Capacitor 打包 |
| 桌面 | Electron / Tauri |

---

## 9. 可选增强功能

```
基础版 ──→ 进阶版
    │
    ├── 多难度模式 (简单/普通/困难)
    ├── 道具系统 (穿墙/减速/加速)
    ├── 排行榜 (LocalStorage / API)
    ├── 每日挑战
    ├── 主题皮肤
    └── 联机对战 (WebSocket)
```

---

## 10. 快速启动命令

```bash
# 创建项目
npm create vite@latest snake-game -- --template phaser

# 安装依赖
cd snake-game
npm install

# 开发模式
npm run dev

# 构建生产版
npm run build
```

---

## 总结

**最推荐组合**: `Phaser 3 + TypeScript + Vite`

- Phaser 3 专为 2D 游戏设计，API 简洁
- TypeScript 提供类型安全
- Vite 开发体验流畅，打包快速

如需更轻量，可以选择 `PixiJS + TypeScript`。
