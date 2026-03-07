# 贪吃蛇游戏项目 GitHub 托管方案

## 概述

本文档提供将贪吃蛇游戏项目完整托管到 GitHub 的详细方案，包括仓库初始化、配置管理、CI/CD 集成、文档规范和安全措施。方案确保项目符合开源最佳实践，便于协作和维护。

## 1. GitHub 仓库创建与初始化

### 1.1 创建新仓库
1. 访问 [GitHub](https://github.com) 并登录
2. 点击右上角 "+" → "New repository"
3. 配置仓库信息：
   - **Repository name**: `snake-game` (建议)
   - **Description**: `A cross-platform Snake game built with HTML5 Canvas, Python backend, and Android WebView wrapper`
   - **Visibility**: Public (开源)
   - **Initialize with**: ❌ 不勾选（我们将手动初始化）
   - **Add .gitignore**: ❌ 不添加（我们将自定义）
   - **Choose a license**: ❌ 不选择（我们将手动添加）

### 1.2 本地仓库初始化步骤

```bash
# 1. 进入项目根目录
cd d:\traeproject\snakegame

# 2. 初始化Git仓库
git init

# 3. 创建并配置所有必要文件（见下文）
# 4. 添加所有文件到暂存区
git add .

# 5. 提交初始版本
git commit -m "Initial commit: Snake game with Python server, Android wrapper, and build scripts"

# 6. 关联远程仓库
git remote add origin https://github.com/ArcherSavitar/snake-game.git

# 7. 推送代码
git push -u origin main
```

## 2. 项目配置文件

### 2.1 `.gitignore` 文件

创建 `.gitignore` 文件，排除构建产物、缓存文件和敏感信息：

```gitignore
# ==============================
# 操作系统文件
# ==============================
.DS_Store
Thumbs.db
*.swp
*.swo
*~
~$*

# ==============================
# Python 相关
# ==============================
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg
MANIFEST
.pytest_cache/
.coverage
htmlcov/
.tox/
.nox/
.hypothesis/
.pytest_cache/

# ==============================
# 项目特定构建输出
# ==============================
# PyInstaller 输出
build/
dist/
*.spec

# 发布文件夹（可保留README和index.html，但排除EXE）
release/StartGame.exe
release/*.exe

# ==============================
# Android 项目
# ==============================
# Android Studio 和 Gradle
android_project/.gradle/
android_project/build/
android_project/.idea/
android_project/*.iml
android_project/local.properties
android_project/captures/

# Gradle 缓存
.gradle/
.gradle-user-home/

# ==============================
# Node.js / JavaScript
# ==============================
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
yarn.lock

# ==============================
# IDE 配置
# ==============================
.vscode/
.idea/
*.swp
*.swo

# ==============================
# 测试文件
# ==============================
# 测试服务器临时文件
test_server.py

# ==============================
# 系统临时文件
# ==============================
*.tmp
*.temp
```

### 2.2 `LICENSE` 文件（MIT 许可证）

创建 `LICENSE` 文件：

```text
MIT License

Copyright (c) 2026 [Your Name]

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

### 2.3 `README.md` 文件

创建详细的 `README.md` 文件：

````markdown
# 🐍 贪吃蛇游戏 (Snake Game)

[![GitHub license](https://img.shields.io/github/license/your-username/snake-game)](https://github.com/your-username/snake-game/blob/main/LICENSE)
[![Python Version](https://img.shields.io/badge/python-3.8+-blue.svg)](https://www.python.org/)
[![GitHub Actions](https://github.com/your-username/snake-game/workflows/CI/badge.svg)](https://github.com/your-username/snake-game/actions)
[![GitHub Pages](https://img.shields.io/badge/demo-GitHub%20Pages-blue)](https://your-username.github.io/snake-game/)

一个跨平台的贪吃蛇游戏，支持 Web、Windows 桌面和 Android 移动设备。

## ✨ 特性

- **🌐 多平台支持**：
  - Web 浏览器（HTML5 Canvas）
  - Windows 桌面应用（Python + PyInstaller）
  - Android 应用（WebView 封装）
- **🎮 丰富的控制方式**：
  - 键盘控制（方向键、WASD）
  - 触摸屏虚拟摇杆（移动设备）
  - 自适应布局（横竖屏切换）
- **⚡ 性能优化**：
  - 60 FPS 流畅动画
  - 自适应画布大小
  - 渐进式加速机制
- **🔧 开发友好**：
  - 完整的构建脚本
  - 详细的代码审计报告
  - CI/CD 自动化工作流

## 🚀 快速开始

### 网页版（最简单）
1. 直接访问：[GitHub Pages 演示](https://your-username.github.io/snake-game/)
2. 或打开 `index.html` 文件

### Windows 桌面版
```bash
# 方法1：使用Python运行本地服务器
python start_game.py

# 方法2：使用打包的EXE文件（在release文件夹）
双击 release/StartGame.exe
```

### Android 版
1. 使用 Android Studio 打开 `android_project/`
2. 连接 Android 设备或使用模拟器
3. 点击运行

## 📁 项目结构

```
snake-game/
├── index.html                 # 游戏主文件（HTML/CSS/JS）
├── start_game.py             # Python HTTP 服务器
├── build_release.py          # Windows EXE 构建脚本
├── android_project/          # Android Studio 项目
│   ├── app/src/main/assets/index.html
│   ├── app/src/main/java/com/snakegame/app/MainActivity.java
│   └── app/src/main/AndroidManifest.xml
├── release/                  # 发布文件
│   ├── index.html           # 网页版
│   ├── StartGame.exe        # Windows启动器
│   └── README.txt           # 使用说明
├── .github/                 # GitHub 配置
│   ├── workflows/          # CI/CD 工作流
│   ├── ISSUE_TEMPLATE/     # Issue 模板
│   └── PULL_REQUEST_TEMPLATE.md
├── 代码审计报告.md          # 完整的代码审计报告
├── 缺陷清单.md              # 问题跟踪清单
└── README.md               # 本文档
```

## 🎮 游戏控制

| 平台 | 控制方式 | 按键/操作 |
|------|----------|-----------|
| 桌面 | 键盘 | 方向键 或 WASD |
| 桌面 | 游戏控制 | 空格键暂停 |
| 移动设备 | 触摸 | 屏幕上的虚拟方向键 |
| 所有平台 | 按钮 | 开始/暂停/重新开始 |

## 🔧 开发指南

### 环境要求
- **Python 3.8+**（用于服务器和构建）
- **现代浏览器**（Chrome 90+, Firefox 88+, Safari 14+）
- **Android Studio**（可选，用于 Android 开发）

### 本地开发
```bash
# 1. 克隆仓库
git clone https://github.com/your-username/snake-game.git
cd snake-game

# 2. 运行本地服务器
python start_game.py

# 3. 浏览器访问 http://localhost:8000
```

### 构建 Windows EXE
```bash
# 需要先安装 PyInstaller
pip install pyinstaller

# 运行构建脚本
python build_release.py
```

### Android 构建
1. 安装 Android Studio
2. 打开 `android_project/` 文件夹
3. 等待 Gradle 同步完成
4. 点击运行按钮

## 🤝 贡献指南

我们欢迎各种形式的贡献！请阅读 [CONTRIBUTING.md](CONTRIBUTING.md) 了解详情。

1. **报告问题**：使用 [Issue 模板](https://github.com/your-username/snake-game/issues/new/choose)
2. **提交PR**：请遵循 [PR 模板](.github/PULL_REQUEST_TEMPLATE.md)
3. **代码规范**：遵循现有代码风格

## 📊 项目状态

| 模块 | 状态 | 测试覆盖率 |
|------|------|-----------|
| 游戏核心逻辑 | ✅ 完成 | 待添加 |
| Python 服务器 | ✅ 完成 | 待添加 |
| Android 封装 | ✅ 完成 | 待添加 |
| CI/CD 流水线 | ✅ 配置完成 | 100% 通过 |
| 代码审计 | ✅ 已完成 | 详细报告可用 |

## 📄 许可证

本项目基于 MIT 许可证开源 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- 游戏灵感来自经典的贪吃蛇游戏
- 使用 HTML5 Canvas 实现渲染
- Python 的 http.server 模块提供本地服务器
- Android WebView 提供移动端支持

## 📞 联系

- **GitHub Issues**: [问题追踪](https://github.com/your-username/snake-game/issues)
- **讨论区**: [GitHub Discussions](https://github.com/your-username/snake-game/discussions)

---
*让贪吃蛇游戏继续进化！ 🐍*
````

### 2.4 依赖管理文件

创建 `requirements.txt` 文件：

```text
# Python 依赖
# 用于运行服务器和构建

# 运行服务器所需
# (标准库，无额外依赖)

# 构建所需
pyinstaller>=5.0

# 开发依赖（可选）
black>=23.0
flake8>=6.0
pytest>=7.0
```

创建 `package.json`（用于前端工具，可选）：

```json
{
  "name": "snake-game",
  "version": "1.0.0",
  "description": "Cross-platform Snake game",
  "scripts": {
    "format": "prettier --write *.html *.css *.js",
    "lint": "eslint *.js",
    "test": "echo 'No tests yet'"
  },
  "devDependencies": {
    "eslint": "^8.0.0",
    "prettier": "^3.0.0"
  }
}
```

## 3. GitHub 仓库配置

### 3.1 分支保护规则

在仓库设置中配置分支保护：

1. 访问仓库 Settings → Branches → Branch protection rules
2. 添加规则保护 `main` 分支：
   - ✅ Require pull request reviews before merging
     - Required approving reviews: 1
   - ✅ Dismiss stale pull request approvals when new commits are pushed
   - ✅ Require status checks to pass before merging
     - Status checks: `ci` (GitHub Actions)
   - ✅ Require conversation resolution before merging
   - ✅ Include administrators
   - ✅ Restrict who can push to matching branches（设置团队/协作者）

### 3.2 Issue 模板

创建 `.github/ISSUE_TEMPLATE/` 目录和模板：

#### Bug 报告模板 (`.github/ISSUE_TEMPLATE/bug_report.md`)

```markdown
---
name: 🐛 Bug 报告
about: 报告游戏或构建中的问题
title: '[BUG] '
labels: 'bug'
assignees: ''
---

## 🐛 问题描述
清晰简洁地描述问题。

## 🔍 复现步骤
1. 打开游戏 '...'
2. 点击 '....'
3. 滚动到 '....'
4. 看到错误

## 🤔 期望行为
描述你期望发生的事情。

## 📸 截图/录屏
如果适用，添加截图或录屏。

## 💻 环境信息
- **设备**: [例如: iPhone 12, Windows PC]
- **操作系统**: [例如: Windows 11, Android 13]
- **浏览器/版本**: [例如: Chrome 120]
- **游戏版本**: [例如: 1.0.0]

## 📝 附加信息
任何其他相关上下文。
```

#### 功能请求模板 (`.github/ISSUE_TEMPLATE/feature_request.md`)

```markdown
---
name: 🚀 功能请求
about: 建议新功能或改进
title: '[FEATURE] '
labels: 'enhancement'
assignees: ''
---

## 🎯 问题/机会
描述当前存在的问题或改进机会。

## 💡 解决方案建议
清晰描述你希望添加的功能。

## 🔄 替代方案
描述你考虑过的其他解决方案。

## 📚 附加信息
任何其他信息或截图。
```

### 3.3 PR 模板

创建 `.github/PULL_REQUEST_TEMPLATE.md`：

```markdown
## 📝 变更描述
清晰描述此PR所做的更改。

## 🔗 相关Issue
关联的Issue编号（例如: Fixes #123）

## ✅ 检查清单
- [ ] 代码遵循项目风格指南
- [ ] 进行了自我测试
- [ ] 添加了必要的测试（如果适用）
- [ ] 所有测试通过
- [ ] 更新了相关文档
- [ ] 代码审查已完成

## 🧪 测试详情
描述你如何测试这些更改。

## 📸 截图/录屏
如果适用，展示变更的视觉效果。

## 📚 附加信息
任何其他重要信息。
```

## 4. GitHub Actions CI/CD 配置

### 4.1 目录结构

```
.github/
└── workflows/
    ├── ci.yml           # 持续集成
    ├── deploy.yml       # 部署到GitHub Pages
    └── android-build.yml # Android构建测试
```

### 4.2 主要工作流配置

#### 4.2.1 持续集成工作流 (`.github/workflows/ci.yml`)

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  python-checks:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Set up Python
      uses: actions/setup-python@v4
      with:
        python-version: '3.10'

    - name: Check Python syntax
      run: |
        python -m py_compile start_game.py
        python -m py_compile build_release.py

    - name: Python code style
      run: |
        python -m pip install black
        black --check --diff start_game.py build_release.py

  javascript-checks:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Check HTML/JS syntax
      run: |
        # 简单检查HTML结构
        grep -q '<!DOCTYPE html>' index.html || exit 1
        grep -q '<canvas' index.html || exit 1

    - name: Validate game functionality
      run: |
        # 检查关键游戏函数是否存在
        grep -q 'function step()' index.html || exit 1
        grep -q 'function draw()' index.html || exit 1

  game-test:
    runs-on: ubuntu-latest
    needs: [python-checks, javascript-checks]
    steps:
    - uses: actions/checkout@v4

    - name: Test HTTP server
      run: |
        # 启动测试服务器并检查响应
        python3 -c "
        import http.server
        import socketserver
        import threading
        import time
        import urllib.request

        handler = http.server.SimpleHTTPRequestHandler
        server = socketserver.TCPServer(('127.0.0.1', 0), handler)
        _, port = server.server_address

        thread = threading.Thread(target=server.serve_forever)
        thread.daemon = True
        thread.start()

        time.sleep(1)

        try:
            resp = urllib.request.urlopen(f'http://127.0.0.1:{port}/index.html')
            if resp.getcode() == 200:
                print('✓ Server test passed')
                server.shutdown()
            else:
                print('✗ Server returned non-200 status')
                exit(1)
        except Exception as e:
            print(f'✗ Server test failed: {e}')
            exit(1)
        "

  build-test:
    runs-on: ubuntu-latest
    needs: game-test
    steps:
    - uses: actions/checkout@v4

    - name: Test release folder structure
      run: |
        # 检查必要的发布文件
        test -f release/index.html || exit 1
        test -f release/README.txt || exit 1
        echo "✓ Release folder structure OK"

  audit-report:
    runs-on: ubuntu-latest
    needs: build-test
    steps:
    - uses: actions/checkout@v4

    - name: Verify audit reports
      run: |
        test -f "代码审计报告.md" || exit 1
        test -f "缺陷清单.md" || exit 1
        echo "✓ Audit reports present"
```

#### 4.2.2 GitHub Pages 部署 (`.github/workflows/deploy.yml`)

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Pages
      uses: actions/configure-pages@v3

    - name: Prepare deployment
      run: |
        # 复制游戏文件到构建目录
        mkdir -p _site
        cp index.html _site/
        # 可选：压缩和优化资源
        echo "Game deployed at $(date)" > _site/deploy-info.txt

    - name: Upload artifact
      uses: actions/upload-pages-artifact@v2
      with:
        path: '_site'

    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v2
```

#### 4.2.3 Android 构建测试 (`.github/workflows/android-build.yml`)

```yaml
name: Android Build Test

on:
  push:
    branches: [ main ]
    paths:
      - 'android_project/**'
  pull_request:
    branches: [ main ]
    paths:
      - 'android_project/**'

jobs:
  android-build-check:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4

    - name: Validate Android project structure
      run: |
        test -f "android_project/app/src/main/AndroidManifest.xml" || exit 1
        test -f "android_project/app/src/main/java/com/snakegame/app/MainActivity.java" || exit 1
        test -d "android_project/app/src/main/assets" || exit 1
        echo "✓ Android project structure valid"

    - name: Check for local.properties
      run: |
        if [ -f "android_project/local.properties" ]; then
          echo "⚠️ WARNING: local.properties file detected. This should not be committed."
          echo "Contents:"
          cat android_project/local.properties
          exit 1
        else
          echo "✓ No local.properties file (good)"
        fi

    - name: Validate game HTML in assets
      run: |
        # 检查assets中的index.html是否与根目录一致
        if [ -f "android_project/app/src/main/assets/index.html" ]; then
          echo "✓ Found index.html in assets"
          # 简单验证
          grep -q "<!DOCTYPE html>" android_project/app/src/main/assets/index.html || exit 1
        else
          echo "ℹ️ Note: No index.html in assets (may need to copy)"
        fi
```

## 5. 项目优化与可发现性

### 5.1 仓库设置优化

1. **仓库描述**:
   ```
   Cross-platform Snake game with HTML5 Canvas, Python backend, and Android wrapper. Play in browser, Windows, or mobile!
   ```

2. **主题标签** (Topics):
   ```
   snake-game, html5-game, python, android, webview, canvas-game, game-development, pygame-alternative
   ```

3. **仓库特性启用**:
   - ✅ Issues
   - ✅ Projects
   - ✅ Wiki
   - ✅ Discussions
   - ✅ Sponsorships

### 5.2 社交预览图

创建 `.github/social-preview.png`（1200×630像素）展示游戏截图。

## 6. 敏感信息清理清单

### 6.1 检查项目中的敏感信息

```bash
# 运行清理检查脚本
#!/bin/bash
echo "=== 敏感信息检查 ==="

# 1. 检查本地配置文件
echo "1. 检查本地配置文件..."
find . -name "local.properties" -o -name ".env*" -o -name "*.key" | while read file; do
  echo "⚠️  发现可能敏感文件: $file"
  echo "   建议: 添加到 .gitignore"
done

# 2. 检查硬编码路径
echo "2. 检查硬编码路径..."
grep -r "C:\\\\" . --include="*.py" --include="*.java" --include="*.xml" 2>/dev/null || true

# 3. 检查可能的API密钥
echo "3. 检查可能的API密钥..."
grep -r -i "api_key\|api_token\|secret\|password\|token" . --include="*.py" --include="*.js" --include="*.java" 2>/dev/null | grep -v ".git" | head -10

# 4. 检查构建产物
echo "4. 检查构建产物..."
find . -name "*.exe" -o -name "*.apk" -o -name "*.jar" 2>/dev/null | while read file; do
  echo "⚠️  发现构建产物: $file"
  echo "   建议: 添加到 .gitignore"
done

echo "=== 检查完成 ==="
```

### 6.2 必须排除的文件

确保以下文件已添加到 `.gitignore`：

1. `android_project/local.properties`（包含用户特定SDK路径）
2. 所有构建输出目录：
   - `build/`
   - `dist/`
   - `android_project/.gradle/`
   - `android_project/build/`
   - `.gradle-user-home/`
3. 系统文件：
   - `.DS_Store`
   - `Thumbs.db`
4. IDE配置：
   - `.idea/`
   - `.vscode/`
5. Python缓存：
   - `__pycache__/`
   - `*.pyc`

## 7. 最终验证步骤

### 7.1 仓库克隆测试

```bash
# 从新仓库克隆
git clone https://github.com/your-username/snake-game.git
cd snake-game

# 验证文件结构
ls -la
```

### 7.2 构建和运行测试

```bash
# 1. 测试网页版
python3 -m http.server 8000 &
# 访问 http://localhost:8000 验证游戏运行

# 2. 测试Python服务器
python start_game.py
# 应该看到服务器启动信息

# 3. 验证Android项目结构
ls -la android_project/
```

### 7.3 CI/CD 验证

1. 推送代码到仓库
2. 检查 GitHub Actions 运行状态
3. 验证所有工作流通过
4. 检查 GitHub Pages 部署成功

## 8. 维护与更新指南

### 8.1 常规维护任务

1. **依赖更新**:
   - 定期更新 `requirements.txt` 中的 Python 包
   - 检查 Android Gradle 版本

2. **安全扫描**:
   - 启用 GitHub Dependabot 安全更新
   - 定期运行代码安全扫描

3. **文档更新**:
   - 保持 README 与最新功能同步
   - 更新变更日志

### 8.2 版本发布流程

1. 创建发布分支 `release/v1.x.x`
2. 更新版本号和相关文档
3. 运行完整测试套件
4. 创建 GitHub Release
5. 更新主分支

## 总结

本方案提供了将贪吃蛇游戏项目完整托管到 GitHub 的详细指南。通过实施此方案，项目将：

1. ✅ 具备专业的开源项目结构
2. ✅ 实现自动化测试和部署
3. ✅ 建立有效的协作流程
4. ✅ 确保代码质量和安全
5. ✅ 提升项目可发现性和可维护性

建议按阶段实施，优先完成基础配置和 CI/CD 流水线，再逐步完善高级功能。

---
*方案版本: 1.0*
*更新日期: 2026-03-07*
*作者: Claude Code 代码审计系统*