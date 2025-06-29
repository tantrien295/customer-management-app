// Customer model
const pool = require('./db');

const Customer = {
  async getAll() {
    const res = await pool.query('SELECT * FROM customers ORDER BY id DESC');
    // Định dạng lại birthday thành "dd-mm-yyyy" hoặc "dd-mm" nếu năm là 1900
    return res.rows.map(row => {
      if (row.birthday) {
        const d = new Date(row.birthday);
        const dd = String(d.getUTCDate()).padStart(2, '0');
        const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
        const yyyy = d.getUTCFullYear();
        row.birthday = (yyyy === 1900 || !yyyy) ? `${dd}-${mm}` : `${dd}-${mm}-${yyyy}`;
      }
      return row;
    });
  },
  async getById(id) {
    const res = await pool.query('SELECT * FROM customers WHERE id = $1', [id]);
    const row = res.rows[0];
    if (row && row.birthday) {
      const d = new Date(row.birthday);
      const dd = String(d.getUTCDate()).padStart(2, '0');
      const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
      const yyyy = d.getUTCFullYear();
      row.birthday = (yyyy === 1900 || !yyyy) ? `${dd}-${mm}` : `${dd}-${mm}-${yyyy}`;
    }
    return row;
  },
  async create(data) {
    const { name, phone, birthday, address, note } = data;
    const res = await pool.query(
      'INSERT INTO customers (name, phone, birthday, address, note) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, phone, birthday, address, note]
    );
    // Định dạng lại birthday khi trả về
    const row = res.rows[0];
    if (row && row.birthday) {
      const d = new Date(row.birthday);
      const dd = String(d.getUTCDate()).padStart(2, '0');
      const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
      const yyyy = d.getUTCFullYear();
      row.birthday = (yyyy === 1900 || !yyyy) ? `${dd}-${mm}` : `${dd}-${mm}-${yyyy}`;
    }
    return row;
  },
  async update(id, data) {
    const { name, phone, birthday, address, note } = data;
    const res = await pool.query(
      'UPDATE customers SET name=$1, phone=$2, birthday=$3, address=$4, note=$5 WHERE id=$6 RETURNING *',
      [name, phone, birthday, address, note, id]
    );
    // Định dạng lại birthday khi trả về
    const row = res.rows[0];
    if (row && row.birthday) {
      const d = new Date(row.birthday);
      const dd = String(d.getUTCDate()).padStart(2, '0');
      const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
      const yyyy = d.getUTCFullYear();
      row.birthday = (yyyy === 1900 || !yyyy) ? `${dd}-${mm}` : `${dd}-${mm}-${yyyy}`;
    }
    return row;
  },
  async delete(id) {
    await pool.query('DELETE FROM customers WHERE id = $1', [id]);
    return true;
  },
};

module.exports = Customer;
