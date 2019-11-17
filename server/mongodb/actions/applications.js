import config from '../../../config';

const mongoose = require('mongoose');
const mongoDB = require('../index');
const Application = require('../models/Application');

const { generateURLString } = require('./util');
const { sendEmail } = require('../../util/email');

async function getApplications() {
  await mongoDB();

  let applications = [];
  await Application
    .find()
    .sort({ submitted: -1 })
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
    sendEmail({
      to: newApplication.email,
      template: 'status',
      locals: {
        status: 0,
        name: newApplication.name,
        baseUrl: config.baseUrl,
        urlString: newApplication.urlString,
      },
    });
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
  let result = {};

  try {
    const curObject = await Application.findOne({ _id: id }, { status: 1 });
    if (curObject.status < 3) {
      result = await Application.findOneAndUpdate({ _id: id }, { status: state, decision: null },
        { upsert: false, new: true, useFindAndModify: false });
    } else {
      result = await Application.findOneAndUpdate({ _id: id }, { status: state },
        { upsert: false, new: true, useFindAndModify: false });
    }
    sendEmail({
      to: curObject.email,
      template: 'status',
      locals: {
        status: state,
        name: result.name,
        baseUrl: config.baseUrl,
        urlString: result.urlString,
        decision: result.decision,
      },
    });
  } finally {
    mongoose.connection.close();
  }

  return result;
}

async function updateApplicationDecision(id, decision) {
  await mongoDB();
  let result = {};

  try {
    result = await Application.findOneAndUpdate({ _id: id }, { decision, status: 4 },
      { upsert: false, new: true, useFindAndModify: false });
  } finally {
    mongoose.connection.close();
  }

  return result;
}

async function updateApplicationMeeting(id, availabilityId) {
  await mongoDB();
  let result = {};

  try {
    result = await Application.findOneAndUpdate({ _id: id }, { meeting: availabilityId },
      { upsert: false, new: true, useFindAndModify: false });
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
  updateApplicationDecision,
  updateApplicationMeeting,
};
