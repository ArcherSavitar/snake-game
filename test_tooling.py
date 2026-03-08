import pathlib
import shutil

import build_release
import start_game
import validate_readme


class _FailingSocket:
    def __init__(self, *_args, **_kwargs):
        raise OSError("boom")


def test_get_local_ip_fallback(monkeypatch):
    monkeypatch.setattr(start_game.socket, "socket", _FailingSocket)
    assert start_game.get_local_ip() == "127.0.0.1"


def test_build_exe_invokes_pyinstaller(monkeypatch):
    called = {}

    def fake_check_call(cmd):
        called["cmd"] = cmd

    monkeypatch.setattr(
        build_release.subprocess, "check_call", fake_check_call
    )
    monkeypatch.setattr(build_release.sys, "executable", "python")

    build_release.build_exe()

    assert called["cmd"] == [
        "python",
        "-m",
        "PyInstaller",
        "--onefile",
        "--name",
        "SnakeGame_Launcher",
        "--clean",
        "start_game.py",
    ]


def test_create_release_folder_outputs_expected_files(monkeypatch):
    temp_dir = pathlib.Path(".tmp_test_workspace")
    if temp_dir.exists():
        shutil.rmtree(temp_dir)
    temp_dir.mkdir()

    monkeypatch.chdir(temp_dir)
    pathlib.Path("index.html").write_text("<html></html>", encoding="utf-8")

    dist_dir = pathlib.Path("dist")
    dist_dir.mkdir()
    (dist_dir / "SnakeGame_Launcher.exe").write_bytes(b"exe")

    build_release.create_release_folder()

    assert pathlib.Path("release/index.html").exists()
    assert pathlib.Path("release/StartGame.exe").exists()
    assert pathlib.Path("release/README.txt").exists()

    monkeypatch.chdir(pathlib.Path(__file__).resolve().parent)
    shutil.rmtree(temp_dir)


def test_check_file_detects_common_issues():
    temp_dir = pathlib.Path(".tmp_test_readme")
    if temp_dir.exists():
        shutil.rmtree(temp_dir)
    temp_dir.mkdir()

    readme = temp_dir / "README.md"
    readme.write_text("\ufeff#Title\n\x00", encoding="utf-8")

    issues = validate_readme.check_file(str(readme))

    assert any("BOM" in item for item in issues)
    assert any("换行符" in item for item in issues)
    assert any("空字节" in item for item in issues)

    shutil.rmtree(temp_dir)
