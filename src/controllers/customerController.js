const Customer = require('../models/customer');

const customerController = {
  async getAll(req, res) {
    const data = await Customer.getAll();
    res.json(data);
  },
  async getById(req, res) {
    const data = await Customer.getById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  },
  async create(req, res) {
    // Validate
    const { name, phone } = req.body;
    if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });
    const data = await Customer.create(req.body);
    res.status(201).json(data);
  },
  async update(req, res) {
    const data = await Customer.update(req.params.id, req.body);
    res.json(data);
  },
  async delete(req, res) {
    await Customer.delete(req.params.id);
    res.json({ success: true });
  },
};

module.exports = customerController;
