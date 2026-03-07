import os
import shutil
import subprocess
import sys

def build_exe():
    print("正在构建 Windows 可执行文件...")
    # 使用 PyInstaller 打包 start_game.py
    # --onefile: 单文件
    # --noconsole: 不显示控制台窗口 (如果想要看服务器日志可以去掉这个，但为了体验最好去掉)
    # 实际上 start_game.py 需要打印 URL，所以保留 console 比较好，或者做一个 GUI。
    # 为了简单且有用，保留 console，这样用户能看到 LAN URL。
    cmd = [
        sys.executable, "-m", "PyInstaller",
        "--onefile",
        "--name", "SnakeGame_Launcher",
        "--clean",
        "start_game.py"
    ]
    subprocess.check_call(cmd)

def create_release_folder():
    print("正在创建发布文件夹...")
    release_dir = "release"
    if os.path.exists(release_dir):
        shutil.rmtree(release_dir)
    os.makedirs(release_dir)

    # 复制游戏文件
    shutil.copy("index.html", os.path.join(release_dir, "index.html"))
    
    # 移动 EXE
    exe_path = os.path.join("dist", "SnakeGame_Launcher.exe")
    if os.path.exists(exe_path):
        shutil.copy(exe_path, os.path.join(release_dir, "StartGame.exe"))
    
    # 创建说明文档
    readme_content = """贪吃蛇游戏 - 分享与运行指南

1. Windows 电脑运行:
   双击文件夹中的 "StartGame.exe"。
   它会自动启动本地服务器并打开浏览器进入游戏。
   在黑色的窗口中，你可以看到 "局域网分享" 的链接。

2. 局域网分享 (手机/平板游玩):
   确保你的电脑和手机连接在同一个 WiFi 下。
   运行 "StartGame.exe"。
   查看黑色窗口中显示的 "局域网分享" 链接 (例如 http://192.168.1.5:8000/)。
   在手机浏览器中输入该链接即可游玩。

3. 网页版分享:
   你可以直接将 index.html 发送给朋友。
   注意：某些浏览器可能限制直接打开本地 HTML 文件的功能，建议使用上述 EXE 启动器。

4. 部署到服务器:
   将 index.html 上传到任何 Web 服务器 (如 GitHub Pages, Netlify) 即可直接通过网址访问。

享受游戏吧！
"""
    with open(os.path.join(release_dir, "README.txt"), "w", encoding="utf-8") as f:
        f.write(readme_content)

    print(f"发布包已生成: {os.path.abspath(release_dir)}")

if __name__ == "__main__":
    try:
        build_exe()
        create_release_folder()
        print("构建完成！")
    except Exception as e:
        print(f"构建失败: {e}")
