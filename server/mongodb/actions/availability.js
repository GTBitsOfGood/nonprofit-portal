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

async function updateAvailability(id, isBooked) {
  await mongoDB();
  let result = {};

  try {
    result = await Availability.findOneAndUpdate({ _id: id }, { isBooked },
      { upsert: false, new: true, useFindAndModify: false });
  } finally {
    mongoose.connection.close();
  }

  return result;
}
