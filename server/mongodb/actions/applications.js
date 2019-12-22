import mongoose from 'mongoose';
import mongoDB from '../index';
import Application from '../models/Application';
import { generateURLString } from './util';
import { sendEmail } from '../../util/email';
import config from '../../../config';

export async function getApplications() {
  await mongoDB();

  return Application
    .find()
    .sort({ submitted: -1 })
    .then((applications) => {
      mongoose.connection.close();

      return applications;
    })
    .catch((e) => {
      mongoose.connection.close();

      throw e;
    });
}

export async function addApplication(application) {
  await mongoDB();

  const pageURLString = await generateURLString();

  return Application.create({
    ...application,
    urlString: pageURLString,
  })
    .then(async (newApplication) => {
      mongoose.connection.close();

      await sendEmail({
        to: newApplication.email,
        template: 'status',
        locals: {
          status: 0,
          name: newApplication.name,
          baseUrl: config.baseUrl,
          urlString: newApplication.urlString,
        },
      });

      return newApplication;
    })
    .catch((e) => {
      mongoose.connection.close();

      throw e;
    });
}

export async function deleteApplication(id) {
  await mongoDB();

  await Application.findById(id)
    .then((application) => application.remove())
    .then(() => {
      mongoose.connection.close();
    })
    .catch((e) => {
      mongoose.connection.close();

      throw e;
    });
}

export async function updateApplicationState(id, state) {
  await mongoDB();

  return Application.findOne({ _id: id }, { status: 1 })
    .then(async (curObject) => {
      let result = {};

      if (curObject.status < 3) {
        result = await Application.findOneAndUpdate({ _id: id }, { status: state, decision: null },
          { upsert: false, new: true, useFindAndModify: false });
      } else {
        result = await Application.findOneAndUpdate({ _id: id }, { status: state },
          { upsert: false, new: true, useFindAndModify: false });
      }

      mongoose.connection.close();

      await sendEmail({
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

      return result;
    })
    .catch((e) => {
      mongoose.connection.close();

      throw e;
    });
}

export async function updateApplicationDecision(id, decision) {
  await mongoDB();

  return Application.findOneAndUpdate({ _id: id }, { decision, status: 4 },
    { upsert: false, new: true, useFindAndModify: false })
    .then((application) => {
      mongoose.connection.close();

      return application;
    })
    .catch((e) => {
      mongoose.connection.close();

      throw e;
    });
}

export async function updateApplicationMeeting(id, availabilityId) {
  await mongoDB();

  return Application.findOneAndUpdate({ _id: id }, { meeting: availabilityId },
    { upsert: false, new: true, useFindAndModify: false })
    .then((application) => {
      mongoose.connection.close();

      return application;
    })
    .catch((e) => {
      mongoose.connection.close();

      throw e;
    });
}

export async function getApplication(urlString) {
  await mongoDB();

  return Application.findOne({ urlString })
    .then((application) => {
      mongoose.connection.close();

      return application;
    })
    .catch((e) => {
      mongoose.connection.close();

      throw e;
    });
}
