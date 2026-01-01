# Happy New Year 2026 - Romantic Greeting Website ❤️

Một website chúc mừng năm mới lãng mạn với nhiều hiệu ứng tương tác đẹp mắt.

## ✨ Features

- 🎆 Landing page với particles animation và floating hearts
- 💌 Interactive message section với typewriter effect
- 💕 Memory cards với scroll animations
- 📸 Photo & Video gallery với lightbox
- 🎬 Cinematic surprise experience (4-stage emotional journey)
- 🎉 Final countdown và message
- 📱 Fully responsive design

## 🚀 Deployment trên GitHub Pages

### Cách 1: Sử dụng GitHub Pages (Recommended)

1. **Tạo repository mới trên GitHub:**
   - Vào https://github.com/new
   - Đặt tên repository (ví dụ: `newyear-2026`)
   - Chọn Public hoặc Private
   - Không check "Initialize with README"
   - Click "Create repository"

2. **Push code lên GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit - New Year 2026 romantic website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

3. **Kích hoạt GitHub Pages:**
   - Vào repository trên GitHub
   - Click "Settings" tab
   - Scroll xuống "Pages" section (bên trái menu)
   - Ở "Source", chọn "Deploy from a branch"
   - Chọn branch: `main`
   - Chọn folder: `/ (root)`
   - Click "Save"
   - Đợi vài phút để GitHub deploy

4. **Truy cập website:**
   - URL sẽ là: `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`
   - Ví dụ: `https://username.github.io/newyear-2026/`

### Cách 2: Sử dụng gh-pages branch (Alternative)

Nếu muốn dùng branch riêng cho Pages:

```bash
git checkout -b gh-pages
git push origin gh-pages
```

Sau đó trong Settings > Pages, chọn branch `gh-pages`.

## 📁 Cấu trúc thư mục

```
Newyear/
├── index.html          # File HTML chính
├── styles.css          # CSS styles
├── script.js           # JavaScript functionality
├── gallery-list.js     # Auto-generated gallery list
├── assets/
│   ├── images/        # Thêm ảnh và video vào đây
│   └── music/         # Thư mục cho nhạc nền (optional)
├── generate-gallery.ps1  # Script để tự động tạo gallery list
└── README.md
```

## 🖼️ Thêm ảnh và video vào Gallery

1. Đặt file vào thư mục `assets/images/`
2. Chạy script để tự động tạo danh sách:
   ```powershell
   .\generate-gallery.ps1
   ```
   Hoặc nếu dùng Node.js:
   ```bash
   node generate-gallery.js
   ```
3. Refresh trang để xem gallery mới

## 🎨 Tùy chỉnh

- **Màu sắc**: Chỉnh trong `styles.css`, biến CSS ở đầu file (`:root`)
- **Nội dung**: Sửa text trực tiếp trong `index.html`
- **Gallery**: Tự động load từ `assets/images/`

## 📝 Notes

- Website sử dụng pure HTML/CSS/JavaScript (no frameworks)
- Hỗ trợ responsive trên mọi thiết bị
- Tất cả animations được tối ưu cho performance
- File `gallery-list.js` được tự động generate, không nên chỉnh sửa thủ công

## 💝 Made with Love

Chúc mừng năm mới 2026! ❤️🎉

