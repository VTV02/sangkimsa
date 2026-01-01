# Script helper để deploy lên GitHub
# Chạy: .\deploy.ps1

Write-Host "=== GitHub Deployment Helper ===" -ForegroundColor Cyan
Write-Host ""

# Kiểm tra Git đã được khởi tạo chưa
if (-not (Test-Path ".git")) {
    Write-Host "Khoi tao Git repository..." -ForegroundColor Yellow
    git init
    Write-Host "Da khoi tao Git repository" -ForegroundColor Green
} else {
    Write-Host "Git repository da duoc khoi tao" -ForegroundColor Green
}

Write-Host ""
Write-Host "Cac buoc tiep theo:" -ForegroundColor Cyan
Write-Host "1. Tao repository moi tren GitHub (neu chua co)" -ForegroundColor White
Write-Host "2. Chay cac lenh sau:" -ForegroundColor White
Write-Host ""

Write-Host "git add ." -ForegroundColor Yellow
Write-Host "git commit -m 'Initial commit - New Year 2026 website'" -ForegroundColor Yellow
Write-Host "git branch -M main" -ForegroundColor Yellow
Write-Host "git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git" -ForegroundColor Yellow
Write-Host "git push -u origin main" -ForegroundColor Yellow

Write-Host ""
Write-Host "3. Vao Settings > Pages tren GitHub de kich hoat GitHub Pages" -ForegroundColor White
Write-Host ""
Write-Host "Xem file DEPLOY.md de biet chi tiet!" -ForegroundColor Green
Write-Host ""

