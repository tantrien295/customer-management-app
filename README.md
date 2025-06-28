# Backend Customer Management App

Backend Node.js/Express/PostgreSQL cho ứng dụng quản lý khách hàng, dịch vụ, nhân viên, lịch sử dịch vụ.
- Hỗ trợ API CRUD cho từng đối tượng
- Endpoint upload ảnh (chuẩn bị cho Cloudinary)
- Validate dữ liệu phía server
- Dễ deploy trên Render

## Cài đặt
```bash
npm install
```

## Chạy server
```bash
node index.js
```

## Cấu hình
- Tạo file `.env` với các biến môi trường kết nối PostgreSQL, Cloudinary

## Các bước tiếp theo
- Bổ sung migration, seed, các route/controller/model cho từng đối tượng
