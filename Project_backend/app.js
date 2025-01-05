const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); 

const roomRoutes = require('./routes/room_route');
const bookingRoutes = require('./routes/booking_route');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.error('MongoDB connection error:', err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));