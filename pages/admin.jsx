import React from 'react';
import Router from 'next/router';
import cookie from 'js-cookie';
import ApplicationsList from '../frontend/components/Admin/ApplicationsList';
import config from '../config';
import { verifyToken } from '../frontend/actions/users';

class ViewPage extends React.PureComponent {
  static async getInitialProps(ctx) {
    // eslint-disable-next-line global-require
    const token = ctx.res ? require('next-cookies')(ctx).token : cookie.get('token');

    return verifyToken(token)
      .then((user) => user)
      .catch(async (err) => {
        if (ctx.res) {
          ctx.res.write(err.message.toString());
          ctx.res.writeHead(200);
          ctx.res.end();
        } else {
          await Router.push(config.pages.application);
        }
      });
  }

  render() {
    return (
      <ApplicationsList />
    );
  }
}

export default ViewPage;
