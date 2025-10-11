# Hướng dẫn Setup Netlify cho Next.js Portfolio

## ✅ Đã cấu hình sẵn

### 1. **Plugin Netlify Next.js**
- ✅ Đã cài đặt: `@netlify/plugin-nextjs@5.13.5`
- ✅ Đã cấu hình trong `netlify.toml`
- ✅ Plugin sẽ tự động xử lý:
  - Next.js routing
  - Serverless functions
  - Static optimization
  - Image optimization

### 2. **Build Configuration**
- ✅ `next.config.ts` đã tối ưu cho Netlify
- ✅ `netlify.toml` đã cấu hình đầy đủ
- ✅ Build command: `npm run build`
- ✅ Publish directory: `.next`

## 🚀 Các bước Deploy

### **Bước 1: Push code lên GitHub**
```bash
git add .
git commit -m "Add Netlify Next.js plugin configuration"
git push origin main
```

### **Bước 2: Kết nối với Netlify**
1. Vào [Netlify Dashboard](https://app.netlify.com/)
2. Click **"New site from Git"**
3. Chọn **GitHub** và repository của bạn
4. Netlify sẽ tự động detect Next.js project

### **Bước 3: Build Settings (Tự động)**
Netlify sẽ tự động detect:
- **Build command:** `npm run build`
- **Publish directory:** `.next`
- **Node version:** 20 (từ netlify.toml)

### **Bước 4: Deploy**
1. Click **"Deploy site"**
2. Netlify sẽ:
   - Cài đặt dependencies
   - Chạy build command
   - Apply plugin configurations
   - Deploy site

## 📋 Netlify Build Settings

```
Base directory: / (để trống)
Build command: npm run build
Publish directory: .next
Node version: 20
```

## 🔧 Plugin Features

### **Tự động xử lý:**
- ✅ **Routing:** Client-side routing cho Next.js
- ✅ **Static Files:** Serve static assets từ public/
- ✅ **API Routes:** Convert thành serverless functions
- ✅ **Image Optimization:** Tối ưu images tự động
- ✅ **Caching:** Cache headers cho performance

### **Performance Optimizations:**
- ✅ **Code Splitting:** Tự động split code
- ✅ **Tree Shaking:** Loại bỏ unused code
- ✅ **Minification:** Minify CSS/JS
- ✅ **Compression:** Gzip/Brotli compression

## 📁 File Structure sau Deploy

```
.netlify/
├── functions/          # Serverless functions
├── cache/             # Build cache
└── ...

.next/
├── static/            # Static assets
├── server/            # Server-side code
└── ...

public/
├── assets/
│   ├── cv.pdf         # CV file
│   └── profile.jpg    # Profile image
└── ...
```

## 🎯 URL Structure

```
https://your-site.netlify.app/
├── /                  # Home page
├── /cv               # CV page
└── /assets/cv.pdf    # Direct PDF access
```

## 🔍 Monitoring & Debugging

### **Build Logs:**
- Vào Netlify Dashboard > Deploys
- Click vào deploy để xem logs
- Plugin sẽ hiển thị build progress

### **Function Logs:**
- Vào Functions tab trong Netlify Dashboard
- Xem logs của serverless functions

### **Performance:**
- Vào Analytics tab
- Monitor Core Web Vitals
- Check loading times

## 🚨 Troubleshooting

### **Build Failures:**
1. **Check Node version:** Đảm bảo >= 20
2. **Check dependencies:** `npm install` locally
3. **Check build logs:** Xem chi tiết lỗi trong Netlify

### **Plugin Issues:**
1. **Plugin not found:** Kiểm tra `package.json`
2. **Config errors:** Kiểm tra `netlify.toml`
3. **Build timeout:** Tăng timeout trong settings

### **PDF Issues:**
1. **PDF not loading:** Kiểm tra file `/assets/cv.pdf`
2. **CORS errors:** Plugin sẽ tự động xử lý
3. **File size:** Đảm bảo PDF < 10MB

## 📊 Performance Tips

### **Optimize Images:**
- Sử dụng Next.js Image component
- Plugin sẽ tự động optimize
- WebP format được support

### **Caching:**
- Static assets: 1 year cache
- HTML: 24 hours cache
- API responses: Configurable

### **CDN:**
- Netlify CDN global
- Edge locations worldwide
- Automatic HTTPS

## 🎉 Kết quả

Sau khi deploy thành công:
- ✅ Portfolio hoạt động hoàn hảo
- ✅ PDF viewer load được
- ✅ Images được optimize
- ✅ Performance tối ưu
- ✅ SEO friendly
- ✅ Mobile responsive

**URL:** `https://your-site-name.netlify.app/`
