# Resolve Merge Conflicts Script
$ErrorActionPreference = "Stop"

# Get the script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location -LiteralPath $scriptPath

Write-Host "Resolving merge conflicts..." -ForegroundColor Cyan
Write-Host ""

Write-Host "[1/3] Staging resolved files..." -ForegroundColor Yellow
git add DEPLOYMENT.md
if ($LASTEXITCODE -ne 0) { throw "Failed to stage DEPLOYMENT.md" }

git add products.html
if ($LASTEXITCODE -ne 0) { throw "Failed to stage products.html" }

git add style.css
if ($LASTEXITCODE -ne 0) { throw "Failed to stage style.css" }

Write-Host ""
Write-Host "[2/3] Checking git status..." -ForegroundColor Yellow
git status --short

Write-Host ""
Write-Host "[3/3] Merge conflicts resolved!" -ForegroundColor Green
Write-Host ""
Write-Host "You can now commit the merge with:" -ForegroundColor Cyan
Write-Host "  git commit -m `"Resolve merge conflicts`"" -ForegroundColor White
Write-Host ""
