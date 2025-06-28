// Customer model
const pool = require('./db');

const Customer = {
  async getAll() {
    const res = await pool.query('SELECT * FROM customers ORDER BY id DESC');
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    return res.rows[0];
  },
  async create(data) {
    const { name, phone, birthday, address, note } = data;
    const res = await pool.query(
      'INSERT INTO customers (name, phone, birthday, address, note) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, phone, birthday, address, note]
    );
    return res.rows[0];
  },
  async update(id, data) {
    const { name, phone, birthday, address, note } = data;
    const res = await pool.query(
      'UPDATE customers SET name=$1, phone=$2, birthday=$3, address=$4, note=$5 WHERE id=$6 RETURNING *',
      [name, phone, birthday, address, note, id]
    );
    return res.rows[0];
  },
  async delete(id) {
    await pool.query('DELETE FROM customers WHERE id = $1', [id]);
    return true;
  },
};

module.exports = Customer;
