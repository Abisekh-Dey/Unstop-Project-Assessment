const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/booking_controller');

router.post('/book', bookingController.bookRooms);
router.delete('/deleteBooking', bookingController.deleteBookings);

module.exports = router;
