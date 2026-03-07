#!/usr/bin/env python3
"""
README.md 验证脚本
检查常见的Markdown语法问题，确保在GitHub上正确渲染
"""

import re
import sys

def check_file(filename):
    """检查README.md文件"""
    with open(filename, 'r', encoding='utf-8') as f:
        content = f.read()

    issues = []

    # 1. 检查文件开头和结尾
    if content.startswith('\ufeff'):
        issues.append("文件包含BOM头，建议移除")

    if content.endswith('\n\n'):
        pass  # 正常
    elif not content.endswith('\n'):
        issues.append("文件应以换行符结尾")

    # 2. 检查空字节
    if '\x00' in content:
        issues.append("文件包含空字节，可能损坏")

    # 3. 检查标题层级
    lines = content.split('\n')
    in_code_block = False
    for i, line in enumerate(lines, 1):
        # 检测代码块开始/结束
        if line.strip().startswith('```'):
            in_code_block = not in_code_block
            continue

        if in_code_block:
            continue

        # 检查标题格式
        if line.startswith('#') and ' ' in line:
            level = len(line.split(' ')[0])
            if level > 3:
                issues.append(f"第{i}行: 标题层级过深 (h{level})，建议不超过h3")

    # 4. 检查代码块配对
    code_block_starts = [i for i, line in enumerate(lines, 1)
                        if line.strip().startswith('```')]
    if len(code_block_starts) % 2 != 0:
        issues.append(f"代码块未闭合，开始标记数: {len(code_block_starts)}")

    # 5. 检查链接格式
    link_pattern = r'\[([^\]]+)\]\(([^)]+)\)'
    for match in re.finditer(link_pattern, content):
        link_text, link_url = match.groups()
        if not link_url:
            issues.append(f"空链接: '{link_text}'")
        if link_url.startswith('http') and '<your-username>' in link_url:
            issues.append(f"链接包含占位符: {link_url} (需要替换为实际用户名)")

    # 6. 检查表格格式
    table_pattern = r'^\|.+\|$'
    for i, line in enumerate(lines, 1):
        if re.match(table_pattern, line.strip()) and '---' not in line:
            # 检查表格分隔行
            if i+1 < len(lines) and '---' not in lines[i]:
                pass  # 可能是表格内容

    # 7. 检查徽章格式
    badge_pattern = r'!\[.*?\]\(.*?\)'
    badges = re.findall(badge_pattern, content)
    if badges:
        print(f"发现 {len(badges)} 个徽章")

    # 8. 检查中文字符（仅提醒）
    chinese_chars = re.findall(r'[\u4e00-\u9fff]', content)
    if chinese_chars:
        print(f"文档包含 {len(chinese_chars)} 个中文字符")

    return issues

def main():
    filename = 'README.md'
    print(f"检查文件: {filename}")
    print("=" * 50)

    issues = check_file(filename)

    if issues:
        print(f"发现 {len(issues)} 个潜在问题:")
        for issue in issues:
            print(f"  ⚠️  {issue}")
        print("\n建议修复这些问题以确保在GitHub上正确渲染。")
        return 1
    else:
        print("✅ 未发现明显的语法问题。")
        print("\n建议在GitHub上验证渲染效果:")
        print("1. 将文件推送到GitHub仓库")
        print("2. 访问仓库页面查看README渲染")
        print("3. 检查标题、列表、表格、代码块、链接的显示")
        print("4. 确保无乱码或格式错误")
        return 0

if __name__ == '__main__':
    sys.exit(main())