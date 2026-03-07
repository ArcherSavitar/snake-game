import http.server
import socketserver
import webbrowser
import sys
import os
import random

# 确保在脚本所在目录运行
os.chdir(os.path.dirname(os.path.abspath(__file__)))

Handler = http.server.SimpleHTTPRequestHandler
# 尝试的端口列表：8000, 8080, 以及随机端口
ports = [8000, 8080, 0]

import socket

def get_local_ip():
    try:
        # 创建一个临时socket连接到外部地址来获取本机IP
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

def start_server():
    for port in ports:
        try:
            # 端口为0时，系统会自动分配一个可用端口
            # 绑定到 0.0.0.0 以允许局域网访问
            server = socketserver.TCPServer(("0.0.0.0", port), Handler)
            _, actual_port = server.server_address
            
            local_ip = get_local_ip()
            local_url = f"http://127.0.0.1:{actual_port}/"
            lan_url = f"http://{local_ip}:{actual_port}/"
            
            print(f"\n服务器启动成功!")
            print(f"----------------------------------------")
            print(f"本机游玩: {local_url}")
            print(f"局域网分享 (同一WiFi下的手机/电脑): {lan_url}")
            print(f"----------------------------------------")
            print("按 Ctrl+C 停止服务器...")
            
            # 自动打开浏览器
            webbrowser.open(local_url)
            
            server.serve_forever()
            return
        except (PermissionError, OSError) as e:
            print(f"尝试端口 {port} 失败: {e}")
            continue

if __name__ == "__main__":
    print("正在启动贪吃蛇游戏服务器...")
    try:
        start_server()
    except KeyboardInterrupt:
        print("\n服务器已停止")
