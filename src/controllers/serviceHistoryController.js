const ServiceHistory = require('../models/serviceHistory');

const serviceHistoryController = {
  async getAll(req, res) {
    const data = await ServiceHistory.getAll();
    res.json(data);
  },
  async getById(req, res) {
    const data = await ServiceHistory.getById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  },
  async create(req, res) {
    // Validate các trường bắt buộc
    const { customer_id, service_id, staff_id, used_date, price, payment_method } = req.body;
    if (!customer_id || !service_id || !staff_id || !used_date || !price || !payment_method) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const data = await ServiceHistory.create(req.body);
    res.status(201).json(data);
  },
  async update(req, res) {
    const data = await ServiceHistory.update(req.params.id, req.body);
    res.json(data);
  },
  async delete(req, res) {
    await ServiceHistory.delete(req.params.id);
    res.json({ success: true });
  },
};

module.exports = serviceHistoryController;
