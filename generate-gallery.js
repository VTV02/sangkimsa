// Script để tự động tạo danh sách ảnh và video từ thư mục assets/images/
// Chạy bằng: node generate-gallery.js

const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'assets', 'images');
const outputFile = path.join(__dirname, 'gallery-list.js');

function getImageFiles(dir) {
    const files = fs.readdirSync(dir);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    const videoExtensions = ['.mp4', '.webm', '.ogg', '.mov'];
    
    const mediaFiles = files
        .filter(file => {
            const ext = path.extname(file).toLowerCase();
            return imageExtensions.includes(ext) || videoExtensions.includes(ext);
        })
        .map(file => `assets/images/${file}`)
        .sort(); // Sắp xếp theo tên
    
    return mediaFiles;
}

try {
    if (!fs.existsSync(imagesDir)) {
        console.log('Thư mục assets/images/ chưa tồn tại. Đang tạo...');
        fs.mkdirSync(imagesDir, { recursive: true });
        console.log('Đã tạo thư mục. Vui lòng thêm ảnh/video vào thư mục này và chạy lại script.');
        process.exit(0);
    }
    
    const mediaFiles = getImageFiles(imagesDir);
    
    if (mediaFiles.length === 0) {
        console.log('Không tìm thấy ảnh hoặc video trong thư mục assets/images/');
        console.log('Vui lòng thêm file vào thư mục và chạy lại script.');
        process.exit(0);
    }
    
    const jsContent = `// File này được tự động tạo bởi generate-gallery.js
// Không chỉnh sửa file này thủ công - chạy lại generate-gallery.js sau khi thêm/xóa file

window.galleryItems = ${JSON.stringify(mediaFiles, null, 2)};

// Export for use in script.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = galleryItems;
}
`;
    
    fs.writeFileSync(outputFile, jsContent, 'utf8');
    
    console.log(`✅ Đã tìm thấy ${mediaFiles.length} file(s):`);
    mediaFiles.forEach((file, index) => {
        console.log(`   ${index + 1}. ${file}`);
    });
    console.log(`\n✅ Đã tạo file: ${outputFile}`);
    console.log('📝 File này sẽ được tự động load bởi script.js');
    
} catch (error) {
    console.error('❌ Lỗi:', error.message);
    process.exit(1);
}

