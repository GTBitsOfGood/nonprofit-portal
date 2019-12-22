import mongoose from 'mongoose';
import moment from 'moment';
import mongoDB from '../index';
import Availability from '../models/Availability';

export async function getAvailabilities() {
  await mongoDB();

  return Availability
    .find({
      startDate: {
        $gte: moment().startOf('week'),
      },
    })
    .sort({
      startDate: -1,
    })
    .then((availabilities) => {
      mongoose.connection.close();

      return availabilities;
    })
    .catch((e) => {
      mongoose.connection.close();

      throw e;
    });
}

export async function addAvailability(availability) {
  await mongoDB();

  return Availability.create(availability)
    .then((result) => {
      mongoose.connection.close();

      return result;
    })
    .catch((e) => {
      mongoose.connection.close();

      throw e;
    });
}

export async function deleteAvailability(id) {
  await mongoDB();

  await Availability.findById(id)
    .then((availability) => availability.remove())
    .then(() => {
      mongoose.connection.close();
    })
    .catch((e) => {
      mongoose.connection.close();

      throw e;
    });
}

export async function updateAvailability(id, updatedFields) {
  await mongoDB();

  return Availability.findOneAndUpdate({ _id: id }, updatedFields,
    { upsert: false, new: true, useFindAndModify: false })
    .then((result) => {
      mongoose.connection.close();

      return result;
    })
    .catch((e) => {
      mongoose.connection.close();

      throw e;
    });
}

export async function getAvailability(id) {
  await mongoDB();

  return Availability.findOne({ _id: id })
    .then((availability) => {
      mongoose.connection.close();

      return availability;
    })
    .catch((e) => {
      mongoose.connection.close();

      throw e;
    });
}
