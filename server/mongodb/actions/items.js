const mongoose = require('mongoose');
const mongoDB = require('../index');
const Item = require('../models/Item');

async function getItems() {
  await mongoDB();

  try {
    return Item
      .find()
      .sort({ date: -1 });
  } finally {
    // mongoConn.disconnect();
    mongoose.connection.close();
  }
}

async function addItem(body) {
  await mongoDB();

  try {
    const newItem = new Item({
      name: body.name,
      address: body.address,
      email: body.email,
      contactName: body.contactName,
      reason: body.reason,
      website: body.website,
    });

    return newItem.save();
  } finally {
    // mongoConn.disconnect();
    mongoose.connection.close();
  }
}

async function deleteItem(id) {
  await mongoDB();

  try {
    return Item.findById(id)
      .then((item) => item.remove());
  } finally {
    // mongoConn.disconnect();
    mongoose.connection.close();
  }
}

module.exports = {
  getItems,
  addItem,
  deleteItem,
};
