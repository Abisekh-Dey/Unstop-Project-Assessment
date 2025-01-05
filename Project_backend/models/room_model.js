const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  number: { type: String, required: true },
  floor: { type: Number, required: true }, 
  isBooked: { type: Boolean, default: false }, 
});

module.exports = mongoose.model('Room', roomSchema);
