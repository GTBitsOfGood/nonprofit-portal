import Application from '../models/Application';
import { randomString } from '../../util/random';

/* eslint no-await-in-loop: "off" */

export async function generateURLString() {
  let urlStringAttempt;
  let attemptCount = 0;

  // attempt to generate a unique pageURL
  while (attemptCount < 10) {
    urlStringAttempt = randomString(8);
    try {
      const res = await Application.findOne({ urlString: urlStringAttempt });
      if (!res) {
        throw new Error("String not found, it can't be used!");
      }
      attemptCount += 1;
    } catch (e) {
      return urlStringAttempt;
    }
  }

  // all attempts failed, throw error
  throw new Error('Internal server error: unique page URL generation failed.');
}
