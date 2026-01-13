@echo off
echo ========================================
echo SmartSpace Website Deployment Script
echo ========================================
echo.

echo Checking Git status...
git status
echo.

echo Do you want to commit and push to GitHub? (Y/N)
set /p choice="Enter choice: "

if /i "%choice%"=="Y" (
    echo.
    echo Adding all files...
    git add .
    
    echo.
    echo Creating commit...
    git commit -m "Deploy SmartSpace IoT Website"
    
    echo.
    echo Pushing to GitHub...
    git push
    
    echo.
    echo ========================================
    echo Deployment complete!
    echo ========================================
    echo.
    echo Next steps:
    echo 1. Go to your GitHub repository
    echo 2. Settings ^> Pages
    echo 3. Select 'main' branch
    echo 4. Save
    echo.
    echo Your site will be live at:
    echo https://YOUR_USERNAME.github.io/smartspace-iot-website/
    echo.
) else (
    echo Deployment cancelled.
)

pause
