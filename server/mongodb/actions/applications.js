const mongoose = require('mongoose');
const mongoDB = require('../index');
const Application = require('../models/Application');
const { generateURLString } = require('./util');

async function getApplications() {
  await mongoDB();

  let applications = [];
  await Application
    .find()
    .sort({ date: -1 })
    .then((res) => {
      applications = res;
      mongoose.connection.close();
    })
    .catch(() => {
      mongoose.connection.close();
    });

  return applications;
}

async function addApplication(application) {
  await mongoDB();

  let result = {};

  try {
    const pageURLString = await generateURLString();
    const newApplication = new Application(application);
    newApplication.urlString = pageURLString;
    result = await newApplication.save();
  } finally {
    mongoose.connection.close();
  }
  return result;
}

async function deleteApplication(id) {
  await mongoDB();

  await Application.findById(id)
    .then((application) => application.remove())
    .then(() => {
      mongoose.connection.close();
    })
    .catch(() => {
      mongoose.connection.close();
    });
}

async function updateApplicationState(id, state) {
  await mongoDB();

  let application = {};
  let result = {};

  try {
    application = await Application.findOne({ id });
    const newApplication = new Application(application);
    newApplication.status = state;
    result = await newApplication.save();
  } finally {
    mongoose.connection.close();
  }
  return result;
}

async function getApplication(urlString) {
  await mongoDB();

  let application = {};

  try {
    application = await Application.findOne({ urlString });
  } finally {
    mongoose.connection.close();
  }
  return application;
}

module.exports = {
  getApplications,
  addApplication,
  deleteApplication,
  getApplication,
  updateApplicationState,
};
