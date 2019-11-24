const pug = require('pug');
const Email = require('email-templates');
const emailFolder = require('./email/import/index');

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

function _render(email, view, locals) {
  return new Promise((resolve, reject) => {
    const viewParts = view.split('/');
    const pugTemplate = emailFolder[viewParts[0]][`${viewParts[1]}.pug`];
    if (typeof pugTemplate === 'undefined') {
      resolve();
    }
    email.juiceResources(pug.render(pugTemplate, { filename: view, ...locals }))
      .then((juicedHTML) => {
        resolve(juicedHTML);
      })
      .catch(reject);
  });
}


const sendEmail = (options) => {
  const email = new Email({
    message: {
      from: fromAddress,
    },
    transport: transportConfig,
    send: true,
    juice: true,
    juiceResources: {
      extraCss: emailFolder[options.template]['style.css'],
    },
    render: (view, locals) => _render(email, view, locals),
  });

  return email.send(
    {
      template: options.template,
      message: {
        to: options.to,
      },
      locals: options.locals,
    },
  );
};

module.exports = { sendEmail };
