
const express = require('express');
const router = express.Router();
const pool = require('../models/db');
const serviceController = require('../controllers/serviceController');

// Endpoint: /api/services/migrate-drop-unused-columns
router.post('/migrate-drop-unused-columns', async (req, res) => {
  try {
    // Xóa các cột không cần thiết nếu tồn tại
    await pool.query('ALTER TABLE services DROP COLUMN IF EXISTS price, DROP COLUMN IF EXISTS payment_method;');
    res.json({ success: true, message: 'Đã xóa các cột không cần thiết (price, payment_method) nếu có.' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message, stack: err.stack });
  }
});

router.get('/', serviceController.getAll);
router.get('/:id', serviceController.getById);
router.post('/', serviceController.create);
router.put('/:id', serviceController.update);
router.delete('/:id', serviceController.delete);

module.exports = router;
