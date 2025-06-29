-- Tạo bảng customers
CREATE TABLE IF NOT EXISTS customers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  birthday DATE,
  address TEXT,
  note TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng services
CREATE TABLE IF NOT EXISTS services (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng staff
CREATE TABLE IF NOT EXISTS staff (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  birthday DATE,
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tạo bảng service_histories
CREATE TABLE IF NOT EXISTS service_histories (
  id SERIAL PRIMARY KEY,
  customer_id INTEGER REFERENCES customers(id) ON DELETE SET NULL,
  service_id INTEGER REFERENCES services(id) ON DELETE SET NULL,
  staff_id INTEGER REFERENCES staff(id) ON DELETE SET NULL,
  used_date DATE NOT NULL,
  price INTEGER NOT NULL,
  payment_method VARCHAR(50) NOT NULL,
  note TEXT,
  images TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
