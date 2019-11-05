const mongoose = require('mongoose');
const mongoDB = require('../index');
const Availability = require('../models/Availability');

async function getAvailabilities() {
  await mongoDB();

  let availabilities = [];
  await Availability
    .find({
      startDate: {
        $gte: new Date(),
      },
    })
    .sort({
      startDate: -1,
    })
    .then((res) => {
      availabilities = res;
      mongoose.connection.close();
    })
    .catch(() => {
      mongoose.connection.close();
    });

  return availabilities;
}

async function addAvailability(availability) {
  await mongoDB();

  let result = {};

  try {
    const newAvailability = new Availability(availability);
    result = await newAvailability.save();
  } finally {
    mongoose.connection.close();
  }

  return result;
}

async function deleteAvailability(id) {
  await mongoDB();

  await Availability.findById(id)
    .then((availability) => availability.remove())
    .then(() => {
      mongoose.connection.close();
    })
    .catch(() => {
      mongoose.connection.close();
    });
}

async function updateAvailability(id, isBooked, team) {
  await mongoDB();
  let result = {};

  try {
    result = await Availability.findOneAndUpdate({ _id: id }, { isBooked, team },
      { upsert: false, new: true, useFindAndModify: false });
  } finally {
    mongoose.connection.close();
  }

  return result;
}

async function getAvailability(id) {
  await mongoDB();

  let availability = {};

  try {
    availability = await Availability.findOne({ _id: id });
  } finally {
    mongoose.connection.close();
  }

  return availability;
}

module.exports = {
  getAvailabilities,
  addAvailability,
  deleteAvailability,
  updateAvailability,
  getAvailability,
};
