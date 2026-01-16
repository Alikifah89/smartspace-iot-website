@echo off
chcp 65001 >nul
cd /d "%~dp0"

echo Resolving merge conflicts...
echo.

echo [1/3] Staging resolved files...
git add DEPLOYMENT.md
git add products.html
git add style.css

echo.
echo [2/3] Checking git status...
git status --short

echo.
echo [3/3] Merge conflicts resolved!
echo.
echo You can now commit the merge with:
echo   git commit -m "Resolve merge conflicts"
echo.
pause
