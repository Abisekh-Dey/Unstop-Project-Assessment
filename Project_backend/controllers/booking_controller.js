const Room = require('../models/room_model');
const Booking = require('../models/booking_model');

const calculateTravelTime = (rooms) => {
  if (rooms.length === 0) return 0;

  let travelTime = 0;
  const floorGroups = rooms.reduce((acc, room) => {
    if (!acc[room.floor]) {
      acc[room.floor] = [];
    }
    acc[room.floor].push(room.number);
    return acc;
  }, {});

  const floors = Object.keys(floorGroups).map(Number).sort((a, b) => a - b);

  for (let i = 0; i < floors.length - 1; i++) {
    travelTime += Math.abs(floors[i + 1] - floors[i]) * 2;
  }

  for (const floor in floorGroups) {
    const roomNumbers = floorGroups[floor].sort((a, b) => a - b);
    travelTime += roomNumbers.length > 1 ? (roomNumbers[roomNumbers.length - 1] - roomNumbers[0]) : 0;
  }

  return travelTime;
};

exports.bookRooms = async (req, res) => {
  const { guestName, numRooms } = req.body;

  if (numRooms > 5) {
    return res.status(400).json({ error: 'You can only book up to 5 rooms.' });
  }

  try {
    const availableRooms = await Room.find({ isBooked: false }).sort({ floor: 1, number: 1 });

    if (availableRooms.length < numRooms) {
      return res.status(400).json({ error: 'Not enough rooms available.' });
    }

    const selectedRooms = availableRooms.slice(0, numRooms);

    await Room.updateMany(
      { _id: { $in: selectedRooms.map((r) => r._id) } },
      { isBooked: true }
    );

    const travelTime = calculateTravelTime(selectedRooms);

    const booking = new Booking({
      guestName,
      rooms: selectedRooms.map((r) => r._id),
      totalTravelTime: travelTime,
    });
    await booking.save();

    res.status(201).json({ message: 'Booking successful.', booking });
  } catch (error) {
    res.status(500).json({ error: 'Failed to book rooms.' });
  }
};

exports.deleteBookings = async (req, res) => {
  try {
    const bookingCount = await Booking.countDocuments();
    
    if (bookingCount === 0) {
      return res.status(404).json({ message: 'No bookings found to delete.' });
    }
    const booking = await Booking.deleteMany();
    res.status(200).json({message: 'Deleted All Booking Records Successfully.'});
  } catch (error) {
    res.status(500).json({ error: 'Failed to Delete Bookings.' });
  }
};
