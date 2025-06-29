const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.get('/', customerController.getAll);
router.get('/:id', customerController.getById);
router.post('/', customerController.create);
router.put('/:id', customerController.update);
router.delete('/:id', customerController.delete);


// Endpoint: /api/customers/migrate-birthday-column
const pool = require('../models/db');
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
