const Email = require('email-templates');
const { join } = require('path');

const fromAddress = '"GT Bits of Good" <test.bitsofgoodportal.gmail.com>';

const transportConfig = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
};

const sendEmail = (options) => {
  const email = new Email({
    message: {
      from: fromAddress,
    },
    transport: transportConfig,
  });

  return email.send(
    {
      template: join(__dirname, '..', '..', 'emails', options.template),
      message: {
        to: options.to,
      },
      locals: options.locals,
    },
  );
};

module.exports = { sendEmail };
