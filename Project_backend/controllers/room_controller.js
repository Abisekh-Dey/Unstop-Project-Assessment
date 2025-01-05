const Room = require('../models/room_model');

exports.generateRooms = async (req, res) => {
  try {
    await Room.deleteMany(); 
    const rooms = [];
    let count=0;

    for (let floor = 1; floor <= 10; floor++) {
      const totalRooms = floor === 10 ? 7 : 10;
      for (let room = 1; room <= totalRooms; room++) {
        count++;
        let roomNumber;
        
        if (room === 10) {
          roomNumber = `${floor}${room}`;  
        } else {
          roomNumber = `${floor}0${room}`;  
        }
        
        rooms.push({ number: roomNumber, floor });
      }
    }

    await Room.insertMany(rooms);
    res.status(201).json({ message: 'Rooms generated successfully.' ,count});
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate rooms.' });
  }
};

exports.getRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    const bookedCount = await Room.countDocuments({ isBooked: true });
    const availableCount = await Room.countDocuments({ isBooked: false });
    res.status(200).json({rooms,bookedCount,availableCount});
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch rooms.' });
  }
};

exports.generateRandomOccupancy = async (req, res) => {
  try {
    const allRooms = await Room.find();
    const numRoomsToBook = Math.floor(Math.random() * allRooms.length); 

    const roomsToBook = allRooms.sort(() => 0.5 - Math.random()).slice(0, numRoomsToBook);
    const roomIds = roomsToBook.map((room) => room._id);

    await Room.updateMany({ _id: { $in: roomIds } }, { isBooked: true });

    res.status(200).json({ message: `${numRoomsToBook} rooms randomly booked`, roomIds });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate random occupancy.' });
  }
};

exports.resetBookings = async (req, res) => {
  try {
    await Room.updateMany({}, { isBooked: false });
    res.status(200).json({ message: 'Room bookings reset successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to reset bookings.' });
  }
};

