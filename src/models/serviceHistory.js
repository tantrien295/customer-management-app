const pool = require('./db');

const ServiceHistory = {
  async getAll() {
    const res = await pool.query('SELECT * FROM service_histories ORDER BY id DESC');
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query('SELECT * FROM service_histories WHERE id = $1', [id]);
    return res.rows[0];
  },
  async create(data) {
    const { customer_id, service_id, staff_id, used_date, price, payment_method, note, images } = data;
    const res = await pool.query(
      'INSERT INTO service_histories (customer_id, service_id, staff_id, used_date, price, payment_method, note, images) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
      [customer_id, service_id, staff_id, used_date, price, payment_method, note, images]
    );
    return res.rows[0];
  },
  async update(id, data) {
    const { customer_id, service_id, staff_id, used_date, price, payment_method, note, images } = data;
    const res = await pool.query(
      'UPDATE service_histories SET customer_id=$1, service_id=$2, staff_id=$3, used_date=$4, price=$5, payment_method=$6, note=$7, images=$8 WHERE id=$9 RETURNING *',
      [customer_id, service_id, staff_id, used_date, price, payment_method, note, images, id]
    );
    return res.rows[0];
  },
  async delete(id) {
    await pool.query('DELETE FROM service_histories WHERE id = $1', [id]);
    return true;
  },
};

module.exports = ServiceHistory;
