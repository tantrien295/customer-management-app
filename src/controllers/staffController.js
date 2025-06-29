const Staff = require('../models/staff');

const staffController = {
  async getAll(req, res) {
    const data = await Staff.getAll();
    res.json(data);
  },
  async getById(req, res) {
    const data = await Staff.getById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  },
  async create(req, res) {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const data = await Staff.create(req.body);
    res.status(201).json(data);
  },
  async update(req, res) {
    const data = await Staff.update(req.params.id, req.body);
    res.json(data);
  },
  async delete(req, res) {
    await Staff.delete(req.params.id);
    res.json({ success: true });
  },
};

module.exports = staffController;
