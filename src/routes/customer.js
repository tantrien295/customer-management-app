
const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const pool = require('../models/db');
// Endpoint: /api/customers/migrate-note-column
router.post('/migrate-note-column', async (req, res) => {
  try {
    await pool.query("ALTER TABLE customers ADD COLUMN IF NOT EXISTS note TEXT;");
    res.json({ success: true, message: 'Đã thêm cột note (nếu chưa có).' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, stack: err.stack });
  }
});

router.get('/', customerController.getAll);
router.get('/:id', customerController.getById);
router.post('/', customerController.create);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.delete);


// Endpoint: /api/customers/migrate-birthday-column
router.post('/migrate-birthday-column', async (req, res) => {
  try {
    await pool.query("ALTER TABLE customers ADD COLUMN IF NOT EXISTS birthday DATE;");
    res.json({ success: true, message: 'Đã thêm cột birthday (nếu chưa có).' });
  } catch (err) {
    // Trả về lỗi chi tiết để debug
    res.status(500).json({ success: false, error: err.message, stack: err.stack });
  }
});

module.exports = router;
