#!/bin/bash
echo "=== 贪吃蛇项目敏感信息清理检查 ==="
echo "执行时间: $(date)"
echo ""

# 1. 检查本地配置文件
echo "1. 检查本地配置文件..."
find . -name "local.properties" -o -name ".env*" -o -name "*.key" -o -name "*secret*" -o -name "*password*" -o -name "*token*" 2>/dev/null | while read file; do
  echo "⚠️  发现可能敏感文件: $file"
  if [[ "$file" == *"local.properties" ]]; then
    echo "   建议: 已添加到 .gitignore，确认未提交"
  else
    echo "   建议: 检查内容并添加到 .gitignore"
  fi
done

# 2. 检查硬编码路径（Windows风格）
echo ""
echo "2. 检查硬编码Windows路径..."
grep -r "C:\\\\" . --include="*.py" --include="*.java" --include="*.xml" --include="*.txt" 2>/dev/null | head -5 || echo "   未发现硬编码Windows路径"

# 3. 检查可能的API密钥和令牌
echo ""
echo "3. 检查可能的API密钥和令牌..."
grep -r -i "api[_-]key\|api[_-]token\|secret[_-]\|password\|token\|key[_-]" . --include="*.py" --include="*.js" --include="*.java" --include="*.json" 2>/dev/null | \
  grep -v ".git" | grep -v "node_modules" | grep -v ".gradle" | head -10 || echo "   未发现明显的API密钥"

# 4. 检查构建产物
echo ""
echo "4. 检查构建产物..."
find . -name "*.exe" -o -name "*.apk" -o -name "*.jar" -o -name "*.pyc" 2>/dev/null | while read file; do
  echo "⚠️  发现构建产物: $file"
  if [[ "$file" == *"release/StartGame.exe" ]] || [[ "$file" == *"dist/SnakeGame_Launcher.exe" ]]; then
    echo "   注意: 这是预期的发布文件，但不应提交到Git"
  fi
done

# 5. 检查.gitignore覆盖情况
echo ""
echo "5. 检查.gitignore覆盖情况..."
missing_ignores=0
for pattern in "local.properties" "*.exe" "*.apk" "*.pyc" "__pycache__" ".gradle" "build/" "dist/"; do
  if ! grep -q "$pattern" .gitignore 2>/dev/null; then
    echo "⚠️  .gitignore中缺少: $pattern"
    missing_ignores=$((missing_ignores+1))
  fi
done
if [ $missing_ignores -eq 0 ]; then
  echo "✓ .gitignore覆盖全面"
fi

# 6. 检查大文件（可能不应提交）
echo ""
echo "6. 检查大文件（>10MB）..."
find . -type f -size +10M 2>/dev/null | while read file; do
  echo "⚠️  发现大文件: $file ($(du -h "$file" | cut -f1))"
  echo "   建议: 考虑使用Git LFS或排除提交"
done

# 7. 总结
echo ""
echo "=== 检查完成 ==="
echo ""
echo "建议操作:"
echo "1. 运行 'git status' 查看未跟踪文件"
echo "2. 运行 'git clean -n' 查看可清理文件（预览）"
echo "3. 提交前确保所有敏感文件已在 .gitignore 中"
echo "4. 考虑运行 'git rm --cached' 从缓存中移除敏感文件"
echo ""
echo "提示: 首次提交前，建议创建干净的工作副本："
echo "  git clone <空仓库URL> temp-folder"
echo "  cp -r <必要文件> temp-folder/"
echo "  cd temp-folder && git add . && git commit"