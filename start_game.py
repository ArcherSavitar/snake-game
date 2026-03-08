import http.server
import os
import socket
import socketserver
import webbrowser

os.chdir(os.path.dirname(os.path.abspath(__file__)))

HOST = "0.0.0.0"
PORTS = [8000, 8080, 0]
Handler = http.server.SimpleHTTPRequestHandler


class ReusableTCPServer(socketserver.TCPServer):
    allow_reuse_address = True


def get_local_ip() -> str:
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as sock:
            sock.connect(("8.8.8.8", 80))
            return sock.getsockname()[0]
    except OSError:
        return "127.0.0.1"


def start_server() -> None:
    for port in PORTS:
        try:
            with ReusableTCPServer((HOST, port), Handler) as server:
                _, actual_port = server.server_address
                local_ip = get_local_ip()
                local_url = f"http://127.0.0.1:{actual_port}/"
                lan_url = f"http://{local_ip}:{actual_port}/"

                print("\n服务器启动成功!")
                print("----------------------------------------")
                print(f"本机游玩: {local_url}")
                print(f"局域网分享 (同一 WiFi 下的手机/电脑): {lan_url}")
                print("----------------------------------------")
                print("按 Ctrl+C 停止服务器...")
                webbrowser.open(local_url)

                server.serve_forever()
                return
        except (PermissionError, OSError) as err:
            print(f"尝试端口 {port} 失败: {err}")


if __name__ == "__main__":
    print("正在启动贪吃蛇游戏服务器...")
    try:
        start_server()
    except KeyboardInterrupt:
        print("\n服务器已停止")
