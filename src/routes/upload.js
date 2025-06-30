const express = require('express');
const multer = require('multer');
const router = express.Router();

// Sử dụng memory storage để chuẩn bị upload lên Cloudinary
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB mỗi file
});

// POST /api/upload - upload nhiều ảnh
router.post('/', upload.array('images', 10), async (req, res) => {
  // Chuẩn bị cho Cloudinary: req.files là mảng buffer ảnh
  // Hiện tại chỉ trả về tên file, sau này sẽ upload lên Cloudinary và trả về URL
  const files = req.files.map(f => ({ originalname: f.originalname, size: f.size }));
  res.json({ success: true, files });
});

module.exports = router;
