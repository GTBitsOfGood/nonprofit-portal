import moment from "moment";
import mongoDB from "../index";
import Availability from "../models/Availability";

export async function getAvailabilities() {
  await mongoDB();

  return Availability.find({
    startDate: {
      $gte: moment().startOf("week"),
    },
  }).sort({
    startDate: -1,
  });
}

export async function addAvailability(availability) {
  await mongoDB();

  return Availability.create(availability);
}

export async function deleteAvailability(id) {
  await mongoDB();

  await Availability.findById(id).then((availability) => availability.remove());
}

export async function updateAvailability(id, updatedFields) {
  await mongoDB();

  return Availability.findOneAndUpdate({ _id: id }, updatedFields, {
    upsert: false,
    new: true,
  });
}

export async function getAvailability(id) {
  await mongoDB();

  return Availability.findOne({ _id: id });
}
