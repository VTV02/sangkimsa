# PowerShell script de tu dong quet thu muc va tao danh sach anh/video
# Chay script nay bang cach: .\generate-gallery.ps1

$imagesDir = Join-Path $PSScriptRoot "assets\images"
$outputFile = Join-Path $PSScriptRoot "gallery-list.js"

# Kiem tra thu muc co ton tai khong
if (-not (Test-Path $imagesDir)) {
    Write-Host "Thu muc assets\images\ chua ton tai. Dang tao..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $imagesDir -Force | Out-Null
    Write-Host "Da tao thu muc. Vui long them anh/video vao thu muc nay va chay lai script." -ForegroundColor Yellow
    exit
}

# Dinh nghia cac extension duoc ho tro
$imageExtensions = @('.jpg', '.jpeg', '.png', '.gif', '.webp')
$videoExtensions = @('.mp4', '.webm', '.ogg', '.mov', '.avi')

# Lay tat ca file trong thu muc
$allFiles = Get-ChildItem -Path $imagesDir -File

# Loc cac file anh va video
$mediaFiles = $allFiles | Where-Object {
    $ext = $_.Extension.ToLower()
    $imageExtensions -contains $ext -or $videoExtensions -contains $ext
} | Sort-Object Name | ForEach-Object {
    "assets/images/$($_.Name)"
}

# Kiem tra co file nao khong
if ($mediaFiles.Count -eq 0) {
    Write-Host "Khong tim thay anh hoac video trong thu muc assets\images\" -ForegroundColor Red
    Write-Host "Vui long them file vao thu muc va chay lai script." -ForegroundColor Yellow
    exit
}

# Tao noi dung JavaScript
$header = "// File nay duoc tu dong tao boi generate-gallery.ps1`r`n// Khong chinh sua file nay thu cong - chay lai generate-gallery.ps1 sau khi them/xoa file`r`n`r`nwindow.galleryItems = [`r`n"
$items = $mediaFiles | ForEach-Object { "    '$_'," }
$itemsString = $items -join "`r`n"
$footer = "`r`n];`r`n`r`n// Export for use in script.js`r`nif (typeof module !== 'undefined' && module.exports) {`r`n    module.exports = galleryItems;`r`n}`r`n"

$jsContent = $header + $itemsString + $footer

# Ghi file voi UTF8 encoding
[System.IO.File]::WriteAllText($outputFile, $jsContent, [System.Text.Encoding]::UTF8)

# Hien thi ket qua
Write-Host ""
Write-Host "Da tim thay $($mediaFiles.Count) file(s):" -ForegroundColor Green
$index = 1
foreach ($file in $mediaFiles) {
    Write-Host "   $index. $file" -ForegroundColor Cyan
    $index++
}
Write-Host ""
Write-Host "Da tao file: gallery-list.js" -ForegroundColor Green
Write-Host "File nay se duoc tu dong load boi script.js" -ForegroundColor Yellow
Write-Host ""
