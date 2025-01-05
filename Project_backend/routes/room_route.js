const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room_controller');

router.post('/generate', roomController.generateRooms);
router.get('/', roomController.getRooms);
router.put('/random', roomController.generateRandomOccupancy);
router.put('/reset', roomController.resetBookings);

module.exports = router;
