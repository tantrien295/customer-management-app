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
    const { name, phone, birthday } = req.body;
    if (!name || !phone) return res.status(400).json({ error: 'Name and phone are required' });

    // Xử lý birthday: chuyển "dd-mm-yyyy" hoặc "dd-mm" thành "yyyy-mm-dd" hoặc null
    let birthdayISO = null;
    if (birthday && typeof birthday === 'string') {
      const parts = birthday.split('-');
      if (parts.length === 3) {
        let [dd, mm, yyyy] = parts;
        if (!yyyy || yyyy === '' || yyyy === undefined) yyyy = '1900';
        if (!isNaN(dd) && !isNaN(mm) && !isNaN(yyyy)) {
          birthdayISO = `${yyyy.padStart(4, '0')}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
        }
      }
    }
    const data = await Customer.create({ ...req.body, birthday: birthdayISO });
    res.status(201).json(data);
  },
  async update(req, res) {
    // Xử lý birthday tương tự khi update
    let { birthday } = req.body;
    let birthdayISO = null;
    if (birthday && typeof birthday === 'string') {
      const parts = birthday.split('-');
      if (parts.length === 3) {
        let [dd, mm, yyyy] = parts;
        if (!yyyy || yyyy === '' || yyyy === undefined) yyyy = '1900';
        if (!isNaN(dd) && !isNaN(mm) && !isNaN(yyyy)) {
          birthdayISO = `${yyyy.padStart(4, '0')}-${mm.padStart(2, '0')}-${dd.padStart(2, '0')}`;
        }
      }
    }
    const data = await Customer.update(req.params.id, { ...req.body, birthday: birthdayISO });
    res.json(data);
  },
  async delete(req, res) {
    await Customer.delete(req.params.id);
    res.json({ success: true });
  },
};

module.exports = customerController;
