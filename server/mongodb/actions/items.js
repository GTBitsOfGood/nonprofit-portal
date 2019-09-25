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

async function addItem(item) {
  await mongoDB();

  const newItem = new Item(item);

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

  await Item.findById(id)
    .then((item) => item.remove())
    .then(() => {
      mongoose.connection.close();
    })
    .catch(() => {
      mongoose.connection.close();
    });
}

module.exports = {
  getItems,
  addItem,
  deleteItem,
};
