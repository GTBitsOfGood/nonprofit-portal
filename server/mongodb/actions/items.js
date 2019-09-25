const mongoose = require('mongoose');
const mongoDB = require('../index');
const Item = require('../models/Item');

async function getItems() {
  await mongoDB();

  let items = [];
  await Item
    .find()
    .sort({ date: -1 })
    .then((res) => {
      items = res;
      mongoose.connection.close();
    })
    .catch(() => {
      mongoose.connection.close();
    });

  return items;
}

async function addItem(body) {
  await mongoDB();

  const newItem = new Item({
    name: body.name,
    address: body.address,
    email: body.email,
    contactName: body.contactName,
    reason: body.reason,
    website: body.website,
  });

  let result = {};
  await newItem
    .save()
    .then((res) => {
      result = res;
      mongoose.connection.close();
    })
    .catch(() => {
      mongoose.connection.close();
    });

  return result;
}

async function deleteItem(id) {
  await mongoDB();

  let result = {};
  await Item.findById(id)
    .then((item) => item.remove())
    .then((res) => {
      result = res;
      mongoose.connection.close();
    })
    .catch(() => {
      mongoose.connection.close();
    });

  return result;
}

module.exports = {
  getItems,
  addItem,
  deleteItem,
};
