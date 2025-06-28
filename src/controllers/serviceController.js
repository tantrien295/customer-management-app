const Service = require('../models/service');

const serviceController = {
  async getAll(req, res) {
    const data = await Service.getAll();
    res.json(data);
  },
  async getById(req, res) {
    const data = await Service.getById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  },
  async create(req, res) {
    const { name } = req.body;
    if (!name) return res.status(400).json({ error: 'Name is required' });
    const data = await Service.create(req.body);
    res.status(201).json(data);
  },
  async update(req, res) {
    const data = await Service.update(req.params.id, req.body);
    res.json(data);
  },
  async delete(req, res) {
    await Service.delete(req.params.id);
    res.json({ success: true });
  },
};

module.exports = serviceController;
