const pool = require('./db');

const Staff = {
  async getAll() {
    const res = await pool.query('SELECT * FROM staff ORDER BY id DESC');
    return res.rows;
  },
  async getById(id) {
    const res = await pool.query('SELECT * FROM staff WHERE id = $1', [id]);
    return res.rows[0];
  },
  async create(data) {
    const { name, phone, note } = data;
    const res = await pool.query(
      'INSERT INTO staff (name, phone, note) VALUES ($1, $2, $3) RETURNING *',
      [name, phone, note]
    );
    return res.rows[0];
  },
  async update(id, data) {
    const { name, phone, note } = data;
    const res = await pool.query(
      'UPDATE staff SET name=$1, phone=$2, note=$3 WHERE id=$4 RETURNING *',
      [name, phone, note, id]
    );
    return res.rows[0];
  },
  async delete(id) {
    await pool.query('DELETE FROM staff WHERE id = $1', [id]);
    return true;
  },
};

module.exports = Staff;
