import React from 'react';
import { Container } from 'reactstrap';
import jwt from 'jsonwebtoken';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import ApplicationsList from '../frontend/components/ApplicationsList';
import config from '../config';

class ViewPage extends React.Component {
  static async getInitialProps(ctx) {
    const token = ctx.res ? nextCookie(ctx).token : cookie.get('token');

    if (ctx.res) {
      let isValid = true;
      try {
        jwt.verify(token, 'secret');
      } catch (e) {
        isValid = false;
      }

      if (!isValid) {
        ctx.res.writeHead(302, {
          Location: config.pages.login,
        });
        ctx.res.end();
      }
    } else {
      let isValid = true;
      try {
        jwt.decode(token);
      } catch (e) {
        isValid = false;
      }

      if (!isValid) {
        await Router.push(config.pages.login);
      }
    }

    return {
      token,
    };
  }

  render() {
    return (
      <Container>
        <ApplicationsList />
      </Container>
    );
  }
}

export default ViewPage;
