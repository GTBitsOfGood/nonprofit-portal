const Email = require('email-templates');
const path = require('path');

const fromAddress = '"GT Bits of Good" <hello@bitsofgood.org>';

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
  const emailPath = path.join(process.env.PROJECT_ROOT, 'email');
  const email = new Email({
    message: {
      from: fromAddress,
    },
    transport: transportConfig,
    send: true,
    juice: true,
    juiceResources: {
      webResources: {
        relativeTo: path.join(emailPath, 'style'),
      },
    },
  });

  return email.send(
    {
      template: path.join(emailPath, 'templates', options.template),
      message: {
        to: options.to,
      },
      locals: options.locals,
    },
  );
};

module.exports = { sendEmail };
