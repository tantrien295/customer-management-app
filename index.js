require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;


// CORS config: allow frontend domain and local dev
app.use(cors({
  origin: [
    'https://posify-customers.onrender.com',
    'http://localhost:5173'
  ],
  credentials: true
}));
// Giới hạn payload nhỏ lại để tránh lỗi trên Render
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
// Middleware xử lý lỗi PayloadTooLarge
app.use((err, req, res, next) => {
  if (err.type === 'entity.too.large') {
    return res.status(413).json({ error: 'Dữ liệu gửi lên quá lớn. Vui lòng giảm kích thước file hoặc dữ liệu.' });
  }
  next(err);
});

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Customer Management Backend API is running!' });
});

// Import and use routes for customers
const customerRoutes = require('./src/routes/customer');
app.use('/api/customers', customerRoutes);

// Import and use routes for services
const serviceRoutes = require('./src/routes/service');
app.use('/api/services', serviceRoutes);

// Import and use routes for staff
const staffRoutes = require('./src/routes/staff');
app.use('/api/staff', staffRoutes);

// Import and use routes for service histories
const serviceHistoryRoutes = require('./src/routes/serviceHistory');
app.use('/api/service-histories', serviceHistoryRoutes);


// Import and use routes for uploads
const uploadRoutes = require('./src/routes/upload');
app.use('/api/upload', uploadRoutes);

// Import and use routes for settings
const settingsRoutes = require('./src/routes/settings');
app.use('/api/settings', settingsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
