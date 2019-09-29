const { randomBytes } = require('crypto');

/**
 * Generates a random hexadecimal string
 * @param {Integer} length the length of the random hexadecimal string
 * @returns {String} the random hexadecimal string
 */
function randomString(length) {
  return new Promise((resolve, reject) => {
    randomBytes(length / 2, (err, buf) => {
      if (err) reject(err);
      resolve(buf.toString('hex'));
    });
  });
}

module.exports = {
  randomString,
};
