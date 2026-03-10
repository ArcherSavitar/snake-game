# 🐍 贪吃蛇游戏 (Snake Game)

[![GitHub release (latest SemVer)](https://img.shields.io/badge/version-v1.0.0-blue)](https://github.com/ArcherSavitar/snake-game/releases)
[![GitHub stars](https://img.shields.io/github/stars/ArcherSavitar/snake-game?style=flat)](https://github.com/ArcherSavitar/snake-game/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/ArcherSavitar/snake-game?style=flat)](https://github.com/ArcherSavitar/snake-game/network)
[![GitHub issues](https://img.shields.io/github/issues/ArcherSavitar/snake-game)](https://github.com/ArcherSavitar/snake-game/issues)
[![GitHub license](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Python](https://img.shields.io/badge/Python-3.8+-3776AB?style=flat&logo=python)](https://www.python.org/)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![Android](https://img.shields.io/badge/Android-3DDC84?style=flat&logo=android)](https://www.android.com/)
[![GitHub Actions Deploy](https://github.com/ArcherSavitar/snake-game/actions/workflows/gh-pages.yml/badge.svg)](https://github.com/ArcherSavitar/snake-game/actions)

一个跨平台的经典贪吃蛇游戏，采用 HTML5 Canvas 技术构建，支持 Web 浏览器、Windows 桌面应用和 Android 移动设备运行。

## 🌐 在线演示

**点击即可直接体验最新构建版本，无需本地安装：**

👉 **[https://ArcherSavitar.github.io/snake-game/](https://ArcherSavitar.github.io/snake-game/)**

> 注意：首次加载可能需要几秒钟时间，请确保网络连接正常。

## ✨ 功能特性

### 🎮 游戏核心功能

| 功能 | 描述 |
|------|------|
| 经典贪吃蛇玩法 | 控制蛇移动并吃掉食物，每次吃完后蛇身变长 |
| 碰撞检测 | 撞墙或撞自身游戏结束 |
| 计分系统 | 实时显示当前得分和最高分 |
| 渐进式加速 | 每吃一个食物，游戏速度略微增加，增加挑战性 |
| 游戏状态管理 | 支持开始、暂停、继续、重新开始 |

### 🖥️ 用户界面功能

| 功能 | 描述 |
|------|------|
| 自适应画布大小 | 根据窗口/屏幕尺寸自动调整游戏区域 |
| 响应式设计 | 完美适配桌面端和移动端 |
| 全屏模式 | 支持浏览器全屏游戏 |
| 触摸控制 | 移动端虚拟方向键（D-Pad） |
| 键盘控制 | 方向键 或 WASD 控制蛇的移动 |

### 🌐 跨平台支持

| 平台 | 描述 |
|------|------|
| Web 应用 | 现代浏览器（Chrome、Firefox、Safari、Edge）直接运行 |
| Windows 桌面 | 通过 PyInstaller 打包的独立可执行文件 |
| Android 应用 | 通过 WebView 封装的原生 Android 应用 |
| 局域网多人 | Python HTTP 服务器支持局域网设备访问 |

## 📋 项目状态

| 模块 | 状态 | 说明 |
|------|------|------|
| 游戏核心 | ✅ 完成 | HTML5 Canvas 实现 |
| Python 服务器 | ✅ 完成 | 本地 HTTP 服务器，支持局域网分享 |
| Android 应用 | ✅ 完成 | WebView 封装 |
| 构建脚本 | ✅ 完成 | PyInstaller 打包 |
| CI/CD | ✅ 完成 | GitHub Actions 自动部署 |
| 代码审计 | ✅ 完成 | 详细报告可用 |

## 🖥️ 系统要求与环境配置

### Web 版

- **浏览器**：Chrome 80+、Firefox 75+、Safari 13+、Edge 80+
- **网络**：首次加载需要网络连接（CDN 资源）

### Python 服务器版

| 要求 | 详情 |
|------|------|
| Python 版本 | Python 3.8 或更高版本 |
| 操作系统 | Windows、macOS、Linux |
| 网络 | 同一局域网（用于分享给他人） |

### Windows 桌面版

| 要求 | 详情 |
|------|------|
| 操作系统 | Windows 10/11 |
| 内存 | 至少 4GB RAM |
| 存储 | 至少 100MB 可用空间 |

### Android 版（开发）

| 要求 | 详情 |
|------|------|
| 开发工具 | Android Studio Arctic Fox 或更高版本 |
| JDK | JDK 11 或更高版本 |
| Gradle | 8.5 或更高版本 |
| Android SDK | API 21 (Android 5.0) 及以上 |

## 🚀 安装部署

### Web 版（无需安装）

#### 方式一：直接打开

```bash
# 克隆仓库
git clone https://github.com/ArcherSavitar/snake-game.git

# 进入目录
cd snake-game

# 直接用浏览器打开
# Windows:
start index.html

# macOS:
open index.html

# Linux:
xdg-open index.html
```

#### 方式二：使用 Python 服务器

```bash
# 确保已安装 Python 3.8+
python --version

# 运行服务器脚本
python start_game.py
```

服务器启动后将自动打开浏览器，你也可以通过以下地址访问：
- 本机访问：`http://127.0.0.1:8000/`
- 局域网访问：`http://<你的IP地址>:8000/`

### Windows 桌面版

#### 方式一：运行预打包的 EXE

```bash
# 克隆仓库
git clone https://github.com/ArcherSavitar/snake-game.git

# 进入 release 目录
cd snake-game/release

# 双击 StartGame.exe 运行
```

#### 方式二：自行打包

```bash
# 1. 安装 Python 依赖
pip install -r requirements.txt

# 2. 运行构建脚本
python build_release.py

# 3. 打包完成后，EXE 文件位于 release 目录
```

### Android 版

#### 方式一：下载安装 APK

前往 [Releases](https://github.com/ArcherSavitar/snake-game/releases) 页面下载最新的 APK 文件进行安装。

#### 方式二：使用 Android Studio 构建

```bash
# 1. 克隆仓库
git clone https://github.com/ArcherSavitar/snake-game.git

# 2. 使用 Android Studio 打开 android_project 目录

# 3. 按照 [README_ANDROID.md](README_ANDROID.md) 指南构建
```

## 📖 使用说明

### 游戏操作

#### 键盘控制

| 按键 | 功能 |
|------|------|
| ↑ / W | 向上移动 |
| ↓ / S | 向下移动 |
| ← / A | 向左移动 |
| → / D | 向右移动 |
| Space | 暂停/继续 |
| Enter | 开始/重新开始 |
| F | 切换全屏模式 |

#### 触摸控制（移动端）

- 使用屏幕上的虚拟方向键（D-Pad）控制蛇的移动
- 点击 Pause 按钮暂停游戏
- 点击 Play 按钮继续游戏

### 游戏规则

1. 使用方向键控制蛇的移动方向
2. 吃掉绿色的食物可以得分并使蛇身变长
3. 每吃一个食物，游戏速度会略微增加
4. 撞到墙壁或自身，游戏结束
5. 尽量获得最高分！

### Python 服务器使用

```bash
# 基本用法
python start_game.py

# 服务器将在以下端口尝试启动：8000, 8080
# 如果端口被占用，会自动尝试下一个端口
```

服务器输出示例：

```
正在启动贪吃蛇游戏服务器...
----------------------------------------
服务器启动成功!
----------------------------------------
本机游玩: http://127.0.0.1:8000/
局域网分享 (同一 WiFi 下的手机/电脑): http://192.168.1.xxx:8000/
----------------------------------------
按 Ctrl+C 停止服务器...
```

## 🛠️ 开发指南

### 开发环境要求

- **Python**: 3.8+
- **Node.js**: 16+ (用于代码格式化)
- **现代浏览器**: Chrome、Firefox、Edge (开发调试)
- **Android Studio**: (可选，Android 开发)

### 安装开发依赖

```bash
# 1. 安装 Python 开发依赖
pip install -r requirements.txt

# 2. 安装 Node.js 开发依赖
npm install

# 3. 安装 Prettier 和 ESLint（已在 package.json 中）
npm install
```

### 代码规范

项目使用以下工具确保代码质量：

```bash
# 格式化代码 (HTML, CSS, JavaScript)
npm run format

# 代码检查
npm run lint
```

### 构建命令

```bash
# 构建 Windows EXE
pip install pyinstaller
python build_release.py

# Android 构建（需要 Android Studio）
# 打开 android_project 目录，使用 Android Studio 构建
```

## 🤝 贡献指南

欢迎提交 Pull Request 和 Issue！请遵循以下规范：

### 提交 Issue

1. 搜索现有 Issue，确认没有重复
2. 使用清晰的标题描述问题
3. 提供复现步骤和环境信息

### 提交 Pull Request

1. Fork 本仓库
2. 创建功能分支：`git checkout -b feature/your-feature`
3. 提交更改：`git commit -m 'Add some feature'`
4. 推送分支：`git push origin feature/your-feature`
5. 创建 Pull Request

### 提交信息规范

```
<type>(<scope>): <subject>

<body>

<footer>
```

类型（type）说明：
- `feat`: 新功能
- `fix`: Bug 修复
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建或辅助工具变动

### 代码审查标准

- 代码必须通过 ESLint 检查
- 代码必须通过 Prettier 格式化
- 新功能需要添加相应的测试
- 所有测试必须通过

## 📁 项目结构

```
snake-game/
├── index.html                 # 🎮 游戏主文件 (HTML + CSS + JS)
├── start_game.py             # 🌐 Python HTTP 服务器
├── build_release.py          # 📦 Windows EXE 构建脚本
├── package.json              # 📋 Node.js 配置
├── requirements.txt          # 🐍 Python 依赖
├── LICENSE                   # 📜 MIT 许可证
├── README.md                 # 📖 主文档
├── README_ANDROID.md         # 📱 Android 构建指南
├── 代码审计报告.md           # 🔍 代码质量审计报告
├── 缺陷清单.md               # 🐛 问题跟踪清单
├── android_project/          # 🤖 Android Studio 项目
│   └── app/
│       └── src/main/
│           └── java/com/snakegame/app/
│               └── MainActivity.java
├── .github/                  # 🔧 GitHub 配置
│   ├── workflows/           # ⚡ CI/CD 工作流
│   │   ├── gh-pages.yml    # 🌐 GitHub Pages 部署
│   │   ├── android-build.yml # 📱 Android 构建
│   │   └── ci.yml          # 🔄 持续集成
│   └── ISSUE_TEMPLATE/      # 📋 Issue 模板
└── release/                  # 📦 发布文件
    └── StartGame.exe        # 🖥️ Windows 可执行文件
```

## 📊 代码质量

项目已完成全面审计，关键指标：

| 指标 | 数值 |
|------|------|
| 综合评分 | 4.8/10（需改进） |
| 安全问题 | 7个中危，5个低危 |
| 代码质量问题 | 6个高优先级 |
| 性能问题 | 3个可优化点 |

详细审计结果参见 [代码审计报告.md](代码审计报告.md)。

## 📄 文档

1. **[代码审计报告.md](代码审计报告.md)** - 详细的代码质量、安全、性能审计
2. **[缺陷清单.md](缺陷清单.md)** - 问题跟踪和修复优先级
3. **[README_ANDROID.md](README_ANDROID.md)** - Android 构建详细指南

## 📜 许可证

本项目基于 MIT 许可证开源。

```
MIT License

Copyright (c) 2026 ArcherSavitar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📧 联系方式

- **GitHub**: [ArcherSavitar](https://github.com/ArcherSavitar)
- **项目 Issues**: [提交问题](https://github.com/ArcherSavitar/snake-game/issues)
- **项目仓库**: [https://github.com/ArcherSavitar/snake-game](https://github.com/ArcherSavitar/snake-game)

## 🙏 致谢

感谢以下开源项目和工具：

- [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - 游戏渲染引擎
- [PyInstaller](https://www.pyinstaller.org/) - Python 打包工具
- [ESLint](https://eslint.org/) - JavaScript 代码检查
- [Prettier](https://prettier.io/) - 代码格式化工具
- [GitHub Actions](https://github.com/features/actions) - 持续集成与部署
- [Android Studio](https://developer.android.com/studio) - Android 开发环境

---

*最后更新：2026-03-10*

*已配置 GitHub Pages 自动部署 - 每次推送到 main 分支后自动更新在线版本*
