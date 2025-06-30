const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Đường dẫn file settings (có thể thay bằng DB nếu muốn)
const SETTINGS_PATH = path.join(__dirname, '../../settings.json');

// Lấy settings
router.get('/', (req, res) => {
  try {
    if (!fs.existsSync(SETTINGS_PATH)) {
      return res.json({});
    }
    const data = fs.readFileSync(SETTINGS_PATH, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: 'Không đọc được settings!' });
  }
});

// Lưu settings
router.post('/', (req, res) => {
  try {
    fs.writeFileSync(SETTINGS_PATH, JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: 'Không lưu được settings!' });
  }
});

module.exports = router;
