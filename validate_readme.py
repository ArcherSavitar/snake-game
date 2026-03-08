#!/usr/bin/env python3
"""README.md 语法检查脚本。"""

import re
import sys


def check_file(filename: str) -> list[str]:
    with open(filename, "r", encoding="utf-8") as file:
        content = file.read()

    issues: list[str] = []

    if content.startswith("\ufeff"):
        issues.append("文件包含 BOM 头，建议移除")
    if not content.endswith("\n"):
        issues.append("文件应以换行符结尾")
    if "\x00" in content:
        issues.append("文件包含空字节，可能已损坏")

    lines = content.split("\n")
    in_code_block = False
    for line_no, line in enumerate(lines, 1):
        stripped = line.strip()
        if stripped.startswith("```"):
            in_code_block = not in_code_block
            continue
        if in_code_block:
            continue

        if line.startswith("#") and " " in line:
            level = len(line.split(" ")[0])
            if level > 3:
                issues.append(
                    f"第{line_no}行: 标题层级过深 (h{level})，建议不超过 h3"
                )

    code_fences = [line for line in lines if line.strip().startswith("```")]
    if len(code_fences) % 2 != 0:
        issues.append("代码块未闭合")

    link_pattern = r"\[([^\]]+)\]\(([^)]+)\)"
    for match in re.finditer(link_pattern, content):
        link_text, link_url = match.groups()
        if not link_url:
            issues.append(f"空链接: '{link_text}'")
        if link_url.startswith("http") and "<your-username>" in link_url:
            issues.append(f"链接包含占位符: {link_url}")

    return issues


def main() -> int:
    filename = "README.md"
    print(f"检查文件: {filename}")
    print("=" * 50)

    issues = check_file(filename)
    if issues:
        print(f"发现 {len(issues)} 个潜在问题:")
        for issue in issues:
            print(f"  - {issue}")
        return 1

    print("未发现明显的语法问题。")
    return 0


if __name__ == "__main__":
    sys.exit(main())
