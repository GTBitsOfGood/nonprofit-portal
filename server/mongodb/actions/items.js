const mongoose = require('mongoose');
const mongoDB = require('../index');
const Item = require('../models/Item');
const PageURL = require('../models/PageURL');
const { generateURLString } = require('./util');

/* eslint no-underscore-dangle: "off" */

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

  let result = {};

  try {
    const pageURLString = await generateURLString();
    const newItem = new Item(item);
    result = await newItem.save();

    const newPageURL = new PageURL({
      itemId: result._id.toString(),
      urlString: pageURLString,
    });

    await newPageURL.save();
  } finally {
    mongoose.connection.close();
  }
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

async function getItem(urlString) {
  await mongoDB();

  let item = {};

  try {
    const pageURL = await PageURL.findOne({ urlString });
    item = await Item.findById(pageURL.itemId);
  } finally {
    mongoose.connection.close();
  }
  return item;
}

module.exports = {
  getItems,
  addItem,
  deleteItem,
  getItem,
};
