const pool = require('./db');

const Service = {
  async getAll() {
    const res = await pool.query('SELECT * FROM services ORDER BY id DESC');
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query('SELECT * FROM services WHERE id = $1', [id]);
    return res.rows[0];
  },
  async create(data) {
    const { name, description } = data;
    const res = await pool.query(
      'INSERT INTO services (name, description) VALUES ($1, $2) RETURNING *',
      [name, description]
    );
    return res.rows[0];
  },
  async update(id, data) {
    const { name, description } = data;
    const res = await pool.query(
      'UPDATE services SET name=$1, description=$2 WHERE id=$3 RETURNING *',
      [name, description, id]
    );
    return res.rows[0];
  },
  async delete(id) {
    await pool.query('DELETE FROM services WHERE id = $1', [id]);
    return true;
  },
};

module.exports = Service;
