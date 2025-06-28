const express = require('express');
const router = express.Router();
const serviceHistoryController = require('../controllers/serviceHistoryController');

router.get('/', serviceHistoryController.getAll);
router.get('/:id', serviceHistoryController.getById);
router.post('/', serviceHistoryController.create);
router.put('/:id', serviceHistoryController.update);
router.delete('/:id', serviceHistoryController.delete);

module.exports = router;
