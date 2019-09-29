const PageURL = require('../models/PageURL');
const { randomString } = require('../../util/random');

/* eslint no-await-in-loop: "off" */

async function generateURLString() {
  let urlStringAttempt;
  let attemptCount = 0;

  // attempt to generate a unique pageURL
  while (attemptCount < 10) {
    urlStringAttempt = randomString(8);
    try {
      await PageURL.findOne({ urlString: urlStringAttempt });
      attemptCount += 1;
    } catch (e) {
      return urlStringAttempt;
    }
  }

  // all attempts failed, throw error
  throw new Error('Internal server error: unique page URL generation failed.');
}

module.exports = {
  generateURLString,
};
