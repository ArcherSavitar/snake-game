# 贪吃蛇 Snake Game

<div align="center">

![Phaser](https://img.shields.io/badge/Phaser-3.80-2d7ef7?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178c6?style=flat-square)
![Vite](https://img.shields.io/badge/Vite-5.0-646cff?style=flat-square)
![Capacitor](https://img.shields.io/badge/Capacitor-8.0-000000?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**一款跨平台、可无障碍访问的经典贪吃蛇游戏**

[在线试玩](https://archersavitar.github.io/snake-game/) · [项目文档](memory-bank/) · [设计文档](memory-bank/game-design-document.md)

</div>

---

## 目录

- [项目简介](#项目简介)
- [技术架构](#技术架构)
- [快速开始](#快速开始)
- [项目结构](#项目结构)
- [游戏特性](#游戏特性)
- [操作指南](#操作指南)
- [无障碍支持](#无障碍支持)
- [部署说明](#部署说明)
- [未来计划](#未来计划)

---

## 项目简介

本项目是一款使用 **Phaser 3** 游戏引擎开发的经典贪吃蛇游戏，采用 **TypeScript** 编写代码，**Vite** 作为构建工具，支持 Web、Android 和 iOS 多平台运行。

游戏保留了经典贪吃蛇的核心玩法，同时加入了现代游戏的视觉风格和无障碍支持，让所有玩家都能享受游戏的乐趣。

---

## 技术架构

### 核心技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| [Phaser 3](https://phaser.io/) | 3.80 | 2D 游戏引擎 |
| [TypeScript](https://www.typescriptlang.org/) | 5.3 | 类型安全开发 |
| [Vite](https://vitejs.dev/) | 5.0 | 快速构建工具 |
| [Capacitor](https://capacitorjs.com/) | 8.0 | 跨平台打包 |

### 架构设计

```
src/
├── game/              # 游戏核心逻辑
│   ├── Snake.ts       # 蛇的数据与行为
│   ├── Food.ts        # 食物生成逻辑
│   └── GameScene.ts   # Phaser 场景管理
├── ui/                # 用户界面组件
│   ├── HUD.ts         # 得分/速度显示
│   ├── GameOverModal.ts  # 游戏结束弹窗
│   └── ControlsHint.ts   # 操作提示
├── input/             # 输入处理
│   └── InputManager.ts   # 键盘/触摸/游戏手柄
├── accessibility/     # 无障碍支持
│   └── AccessibilityManager.ts  # ARIA 播报
├── storage/           # 数据持久化
│   ├── StorageManager.ts  # 本地存储
│   └── Leaderboard.ts     # 排行榜管理
└── utils/
    └── constants.ts      # 游戏配置常量
```

---

## 快速开始

### 环境要求

- Node.js 18+
- npm 9+

### 安装与运行

```bash
# 克隆项目
git clone https://github.com/ArcherSavitar/snake-game.git
cd snake-game

# 安装依赖
npm install

# 开发模式运行
npm run dev

# 生产构建
npm run build
```

### 移动端打包

```bash
# 添加 Android 平台
npx cap add android

# 同步 Web 资源到 Android
npx cap sync android

# 打开 Android Studio
npx cap open android
```

---

## 项目结构

```
snake-game/
├── src/                    # 源代码
│   ├── main.ts             # 游戏入口
│   ├── game/               # 游戏核心
│   ├── ui/                 # UI 组件
│   ├── input/              # 输入管理
│   ├── accessibility/       # 无障碍功能
│   ├── storage/            # 存储管理
│   └── utils/              # 工具函数
├── public/                 # 静态资源
├── index.html              # HTML 入口
├── package.json            # NPM 配置
├── tsconfig.json           # TypeScript 配置
├── vite.config.ts          # Vite 配置
├── capacitor.config.ts     # Capacitor 配置
└── memory-bank/            # 设计文档
    ├── game-design-document.md
    ├── architecture.md
    └── implementation-plan.md
```

---

## 游戏特性

### 🎮 核心玩法
- 经典贪吃蛇规则，吃食物增长
- 随得分提升，速度逐渐加快
- 撞墙或自撞，游戏结束

### 🎯 分数系统
- 实时显示当前得分
- 记录历史最高分
- 速度等级显示

### 🏆 排行榜
- 本地存储 Top 10 成绩
- 显示排名变化

### 🎨 视觉风格
- 深色主题，护眼舒适
- 渐变色彩，视觉层次分明
- 流畅动画，体验丝滑

---

## 操作指南

### 键盘控制

| 按键 | 功能 |
|------|------|
| `↑` / `W` | 向上移动 |
| `↓` / `S` | 向下移动 |
| `←` / `A` | 向左移动 |
| `→` / `D` | 向右移动 |
| `空格` | 暂停/继续 |

### 触摸控制（移动端）

- 点击屏幕任意位置开始游戏
- 游戏进行中点击任意位置暂停

### 游戏手柄

- 方向键或左摇杆控制移动
- Start/A 键暂停

---

## 无障碍支持

本游戏专为无障碍访问设计，让视力障碍玩家也能享受游戏。

### 屏幕阅读器支持

- 实时播报蛇的移动方向
- 食物位置语音提示
- 得分变化自动通知
- 碰撞检测语音警告
- 游戏状态全程语音反馈

### 无障碍特性

- ARIA Live Region 实时播报
- 高对比度色彩设计
- 大字体显示选项
- 键盘完全可操作
- 游戏手柄支持

---

## 部署说明

### Web 部署

项目通过 GitHub Actions 自动部署到 GitHub Pages。

1. 推送代码到 `main` 分支
2. Actions 自动构建并发布
3. 访问 `https://ArcherSavitar.github.io/snake-game/`

### 手动部署

```bash
# 构建生产版本
npm run build

# 输出在 dist/ 目录
# 上传到任意静态服务器即可
```

---

## 未来计划

- [ ] 皮肤系统
- [ ] 道具系统
- [ ] 关卡模式
- [ ] 成就系统
- [ ] 多人对战
- [ ] 云端排行榜

---

<div align="center">

**Made with ❤️ using Phaser 3 + TypeScript + Vite**

</div>
