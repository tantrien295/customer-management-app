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
    const { name, phone = null, birthday = null, address = null } = data;
    const res = await pool.query(
      'INSERT INTO staff (name, phone, birthday, address) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, phone, birthday, address]
    );
    return res.rows[0];
  },
  async update(id, data) {
    const { name, phone = null, birthday = null, address = null } = data;
    const res = await pool.query(
      'UPDATE staff SET name=$1, phone=$2, birthday=$3, address=$4 WHERE id=$5 RETURNING *',
      [name, phone, birthday, address, id]
    );
    return res.rows[0];
  },
  async delete(id) {
    await pool.query('DELETE FROM staff WHERE id = $1', [id]);
    return true;
  },
};

module.exports = Staff;
