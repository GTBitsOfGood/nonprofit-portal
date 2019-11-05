const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const AvailabilitySchema = new Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  team: {
    type: String,
    default: null,
  },
});

let Availability;

if (mongoose.models.Availability) {
  Availability = mongoose.model('Availability');
} else {
  Availability = mongoose.model('Availability', AvailabilitySchema);
}

module.exports = Availability;
