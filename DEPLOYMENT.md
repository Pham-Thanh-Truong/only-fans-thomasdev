# Hướng dẫn Deploy Portfolio lên Netlify

## Cấu hình Netlify Build Settings

Để deploy portfolio này lên Netlify, bạn cần cấu hình các settings sau:

### Build Settings:
- **Base directory:** `/` (để trống)
- **Build command:** `npm run build`
- **Publish directory:** `.next`

### Environment Variables (nếu cần):
- Không cần environment variables cho project này

## Các bước Deploy:

1. **Push code lên GitHub repository**
2. **Kết nối repository với Netlify:**
   - Vào Netlify Dashboard
   - Click "New site from Git"
   - Chọn GitHub và repository của bạn
   - Cấu hình build settings như trên
   - Click "Deploy site"

3. **Custom Domain (tùy chọn):**
   - Vào Site settings > Domain management
   - Thêm custom domain nếu có

## Cấu trúc Project:

```
public/
├── assets/
│   ├── cv.pdf          # CV của bạn
│   └── profile.jpg     # Ảnh profile
├── cv/                 # CV page
└── ...                 # Các sections khác
```

## Features đã implement:

✅ **Assets Management:**
- Folder `public/assets/` chứa CV và ảnh profile
- Ảnh profile được load thay vì placeholder

✅ **CV Page:**
- Page `/cv` để xem CV trực tiếp
- PDF viewer với iframe
- Download button
- Responsive design

✅ **Navigation:**
- Link "My CV" trong header và footer
- Smooth scroll cho internal links
- Mobile-friendly navigation

✅ **Deployment Ready:**
- Static export configuration
- Netlify.toml với optimizations
- Build scripts cho production

## Lưu ý:

- Project sử dụng Next.js app thông thường (không phải static export)
- PDF được render bằng react-pdf library
- Images được optimize bởi Next.js
- Responsive design cho mọi thiết bị
- CV page có PDF viewer với navigation controls

## Troubleshooting:

Nếu gặp lỗi khi deploy:
1. Kiểm tra build command: `npm run build`
2. Kiểm tra publish directory: `.next`
3. Đảm bảo Node.js version >= 20
4. Kiểm tra file `netlify.toml` có đúng cấu hình
5. Nếu PDF không load được, kiểm tra file `/assets/cv.pdf` có tồn tại
