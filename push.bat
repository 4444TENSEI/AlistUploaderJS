@echo off
setlocal enabledelayedexpansion

:: 执行你的Git命令
git rev-list --objects --all
git checkout --orphan new
git add .
git commit -m "new"

:: 删除并重命名分支
git branch -D main
git branch -m main

:: 强制推送到origin远程仓库
git push -f origin main

:: 设置上游分支并拉取更新
git branch --set-upstream-to=origin/main main
git pull

:: 再次列出所有对象
git rev-list --objects --all

echo 所有操作已完成。
endlocal
