# Hướng dẫn Deploy lên GitHub Pages

## Bước 1: Tạo Repository trên GitHub

1. Đăng nhập vào GitHub
2. Click nút "+" ở góc trên bên phải → "New repository"
3. Đặt tên repository (ví dụ: `newyear-2026-love`)
4. Chọn Public (để dùng GitHub Pages miễn phí)
5. **KHÔNG** check "Add a README file"
6. Click "Create repository"

## Bước 2: Upload Code lên GitHub

### Cách A: Dùng GitHub Desktop (Dễ nhất)

1. Tải GitHub Desktop: https://desktop.github.com/
2. Cài đặt và đăng nhập
3. File → Add Local Repository
4. Chọn folder `Newyear`
5. Click "Publish repository"
6. Đặt tên và chọn Public
7. Click "Publish repository"

### Cách B: Dùng Command Line (Git)

Mở PowerShell hoặc Terminal trong thư mục `Newyear`:

```powershell
# Khởi tạo Git repository
git init

# Thêm tất cả files
git add .

# Commit
git commit -m "Initial commit - New Year 2026 website"

# Đổi tên branch thành main (nếu cần)
git branch -M main

# Thêm remote (thay YOUR_USERNAME và YOUR_REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push lên GitHub
git push -u origin main
```

### Cách C: Dùng GitHub Web Interface

1. Vào repository vừa tạo trên GitHub
2. Click "uploading an existing file"
3. Kéo thả toàn bộ files trong folder `Newyear` vào
4. Click "Commit changes"

## Bước 3: Kích hoạt GitHub Pages

1. Vào repository trên GitHub
2. Click tab **Settings** (ở menu trên cùng)
3. Scroll xuống phần **Pages** (ở menu bên trái)
4. Ở phần **Source**:
   - Chọn "Deploy from a branch"
   - Branch: chọn `main` (hoặc `master`)
   - Folder: chọn `/ (root)`
5. Click **Save**
6. Đợi 1-2 phút để GitHub deploy

## Bước 4: Truy cập Website

Sau khi deploy xong, website sẽ có địa chỉ:

```
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

Ví dụ:
```
https://username.github.io/newyear-2026-love/
```

Bạn có thể copy link này và gửi cho người yêu! ❤️

## Lưu ý

- Lần đầu deploy có thể mất 2-5 phút
- Nếu thay đổi code, commit và push lại lên GitHub
- GitHub Pages sẽ tự động update sau vài phút
- Nếu không thấy website, kiểm tra lại Settings > Pages

## Troubleshooting

**Website không hiển thị?**
- Kiểm tra Settings > Pages đã bật chưa
- Đảm bảo branch đã chọn đúng (main/master)
- Đợi thêm vài phút (có thể mất đến 10 phút lần đầu)

**Ảnh/video không hiển thị?**
- Đảm bảo file `gallery-list.js` đã được generate
- Kiểm tra đường dẫn trong `gallery-list.js` có đúng không
- Đảm bảo files đã được commit và push lên GitHub

