require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
