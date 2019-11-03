import getConfig from 'next/config';

const Email = require('email-templates');
const { join } = require('path');

const { serverRuntimeConfig } = getConfig();

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
  const emailPath = join(serverRuntimeConfig.PROJECT_ROOT, 'email');
  const email = new Email({
    message: {
      from: fromAddress,
    },
    transport: transportConfig,
    send: true,
    juice: true,
    juiceResources: {
      webResources: {
        relativeTo: join(emailPath, 'style'),
      },
    },
  });

  return email.send(
    {
      template: join(emailPath, 'templates', options.template),
      message: {
        to: options.to,
      },
      locals: options.locals,
    },
  );
};

module.exports = { sendEmail };
