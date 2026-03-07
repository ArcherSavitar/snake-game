# 🐍 贪吃蛇游戏 (Snake Game)

[![GitHub](https://img.shields.io/badge/GitHub-仓库-blue)](https://github.com/ArcherSavitar/snake-game)
[![Python](https://img.shields.io/badge/Python-3.8+-blue)](https://www.python.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

一个跨平台的贪吃蛇游戏，支持 Web 浏览器、Windows 桌面和 Android 移动设备。

## 📋 项目状态

| 模块 | 状态 | 说明 |
|------|------|------|
| 游戏核心 | ✅ 完成 | HTML5 Canvas 实现 |
| Python 服务器 | ✅ 完成 | 本地 HTTP 服务器 |
| Android 应用 | ✅ 完成 | WebView 封装 |
| 构建脚本 | ✅ 完成 | PyInstaller 打包 |
| 代码审计 | ✅ 完成 | 详细报告可用 |

## 🚀 快速开始

### 网页版
1. 直接打开 `index.html` 文件
2. 或运行本地服务器：`python start_game.py`

### Windows 版
```bash
# 方法1：Python服务器
python start_game.py

# 方法2：打包的EXE（在release文件夹）
双击 release/StartGame.exe
```

### Android 版
1. 使用 Android Studio 打开 `android_project/`
2. 按照 [README_ANDROID.md](README_ANDROID.md) 指南构建

## 📁 项目结构

```
snake-game/
├── index.html                 # 游戏主文件
├── start_game.py             # Python HTTP 服务器
├── build_release.py          # Windows EXE 构建脚本
├── android_project/          # Android Studio 项目
├── release/                  # 发布文件
├── .github/                  # GitHub 配置（托管方案）
│   ├── workflows/           # CI/CD 工作流模板
│   ├── ISSUE_TEMPLATE/      # Issue 模板
│   └── PULL_REQUEST_TEMPLATE.md
├── 代码审计报告.md           # 完整的代码审计报告
├── 缺陷清单.md               # 问题跟踪清单
├── GitHub托管方案.md         # 完整的GitHub托管方案
├── .gitignore               # Git忽略规则
├── LICENSE                  # MIT许可证
├── requirements.txt         # Python依赖
└── README.md               # 本文档
```

## 📄 文档

1. **[代码审计报告.md](代码审计报告.md)** - 详细的代码质量、安全、性能审计
2. **[缺陷清单.md](缺陷清单.md)** - 问题跟踪和修复优先级
3. **[GitHub托管方案.md](GitHub托管方案.md)** - 完整的GitHub仓库配置指南
4. **[README_ANDROID.md](README_ANDROID.md)** - Android 构建指南

## 🔧 开发

### 环境要求
- **Python 3.8+**
- **现代浏览器**（Chrome、Firefox、Safari）
- **Android Studio**（可选，用于 Android 开发）

### 构建 Windows EXE
```bash
# 安装 PyInstaller
pip install pyinstaller

# 运行构建脚本
python build_release.py
```

## 📊 代码质量

项目已完成全面审计，关键指标：

- **综合评分**: 4.8/10（需改进）
- **安全问题**: 7个中危，5个低危
- **代码质量问题**: 6个高优先级
- **性能问题**: 3个可优化点

详细审计结果参见 [代码审计报告.md](代码审计报告.md)。

## 🎮 游戏功能

- 自适应画布大小
- 键盘和触摸控制
- 渐进式加速机制
- 跨平台支持
- 响应式设计

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

*最后更新: 2026-03-07*
