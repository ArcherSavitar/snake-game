# Android APK 构建指南

由于您当前的开发环境缺少必要的 Android SDK 和 Gradle 构建工具链，我们为您生成了完整的 **Android Studio 工程源码**。

您可以按照以下步骤，在任何安装了 Android Studio 的电脑上生成 APK 安装包。

## 目录结构
`android_project/` 包含了标准的 Android 工程文件：
- `app/src/main/assets/index.html`: 您的游戏核心代码（已自动同步）
- `app/src/main/java/.../MainActivity.java`: Android 原生外壳（WebView）
- `build.gradle`: 构建配置文件

## 步骤 1: 准备环境
1. 下载并安装 [Android Studio](https://developer.android.com/studio) (Windows/Mac/Linux)。
2. 安装时勾选 "Android SDK" 和 "Android Virtual Device"。

## 步骤 2: 打开项目
1. 启动 Android Studio。
2. 选择 **"Open"**。
3. 导航到本目录下的 `android_project` 文件夹并选择它。
4. 等待 Android Studio 自动同步 Gradle 项目（初次打开可能需要下载依赖，需保持网络畅通）。

## 步骤 3: 运行与测试
1. 点击顶部工具栏的 **"Run"** 按钮（绿色三角形）。
2. 选择一个模拟器（AVD）或连接您的 Android 手机（需开启 USB 调试）。
3. 游戏将自动安装并在设备上运行。

## 步骤 4: 打包发布 (生成 APK)
1. 在菜单栏选择 **Build > Generate Signed Bundle / APK**。
2. 选择 **APK**，点击 Next。
3. **Key store path**: 选择 "Create new..." 创建一个新的签名密钥（妥善保存 `.jks` 文件）。
   - 填写密码、Alias（别名）、Validity（有效期，建议 25 年以上）。
4. 点击 Next，选择 **release** 版本。
5. 勾选 **V1 (Jar Signature)** 和 **V2 (Full APK Signature)**。
6. 点击 **Finish**。

构建完成后，Android Studio 会在右下角提示，点击 **"locate"** 即可找到生成的 `.apk` 文件。

## 注意事项
- **横竖屏适配**: 项目已配置为自动感应屏幕方向，您的 Web 游戏代码已包含响应式逻辑。
- **权限**: 已在 `AndroidManifest.xml` 中声明了 `INTERNET` 权限（虽然加载本地文件通常不需要，但为了可能的扩展性保留）。
