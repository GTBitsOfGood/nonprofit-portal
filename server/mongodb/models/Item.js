const mongoose = require('mongoose');

const { Schema } = mongoose;

// Create Schema
const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: false,
  },
  workPhone: {
    type: String,
    required: true,
  },
  contactName: {
    type: String,
    required: true,
  },
  mobilePhone: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  mission: {
    type: String,
    required: true,
  },
  needsWeb: {
    type: String,
    required: false,
  },
  needsMobile: {
    type: String,
    required: false,
  },
  needsOther: {
    type: String,
    required: false,
  },
  needsOtherExpand: {
    type: String,
    required: false,
  },
  stageNew: {
    type: String,
    required: false,
  },
  stageUnfinish: {
    type: String,
    required: false,
  },
  stageRedesign: {
    type: String,
    required: false,
  },
  stageOther: {
    type: String,
    required: false,
  },
  stageOtherExpand: {
    type: String,
    required: false,
  },
  availFlexible: {
    type: String,
    required: false,
  },
  availWeek: {
    type: String,
    required: false,
  },
  availBiweek: {
    type: String,
    required: false,
  },
  availMonth: {
    type: String,
    required: false,
  },
  availLess: {
    type: String,
    required: false,
  },
  fieldYes: {
    type: String,
    required: false,
  },
  fieldNo: {
    type: String,
    required: false,
  },
  fieldRemote: {
    type: String,
    required: false,
  },
  feedback: {
    type: String,
    required: false,
  },
});

let Item;

if (mongoose.models.Item) {
  Item = mongoose.model('Item');
} else {
  Item = mongoose.model('Item', ItemSchema);
}

module.exports = Item;
