import os
import shutil
import subprocess
import sys


def build_exe() -> None:
    print("正在构建 Windows 可执行文件...")
    cmd = [
        sys.executable,
        "-m",
        "PyInstaller",
        "--onefile",
        "--name",
        "SnakeGame_Launcher",
        "--clean",
        "start_game.py",
    ]
    subprocess.check_call(cmd)


def create_release_folder() -> None:
    print("正在创建发布文件夹...")
    release_dir = "release"
    if os.path.exists(release_dir):
        shutil.rmtree(release_dir)
    os.makedirs(release_dir)

    shutil.copy("index.html", os.path.join(release_dir, "index.html"))

    exe_path = os.path.join("dist", "SnakeGame_Launcher.exe")
    if os.path.exists(exe_path):
        shutil.copy(exe_path, os.path.join(release_dir, "StartGame.exe"))

    readme_content = """贪吃蛇游戏 - 分享与运行指南
1. Windows 电脑运行:
   双击文件夹中的 "StartGame.exe"。
   它会自动启动本地服务器并打开浏览器进入游戏。
   在黑色窗口中可以看到“局域网分享”链接。
2. 局域网分享 (手机/平板游玩):
   确保电脑和手机连接在同一 WiFi 下。
   运行 "StartGame.exe"。
   查看窗口中的“局域网分享”链接
   (例如 http://192.168.1.5:8000/)。
   在手机浏览器输入该链接即可游玩。
3. 网页版分享:
   可直接发送 index.html 给朋友。
   注意：部分浏览器可能限制直接打开本地 HTML 文件的功能。
4. 部署到服务器:
   上传 index.html 到任意 Web 服务器 (如 GitHub Pages、Netlify) 即可。
享受游戏吧！
"""
    readme_path = os.path.join(release_dir, "README.txt")
    with open(readme_path, "w", encoding="utf-8") as file:
        file.write(readme_content)

    print(f"发布包已生成: {os.path.abspath(release_dir)}")


if __name__ == "__main__":
    try:
        build_exe()
        create_release_folder()
        print("构建完成！")
    except Exception as err:
        print(f"构建失败: {err}")
