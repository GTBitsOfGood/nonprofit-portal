import { randomBytes } from 'crypto';

/**
 * Generates a random hexadecimal string
 * @param {Integer} length the length of the random hexadecimal string
 * @returns {String} the random hexadecimal string
 */
export function randomString(length) {
  return new Promise((resolve, reject) => {
    randomBytes(length / 2, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString('hex'));
    });
  });
}
