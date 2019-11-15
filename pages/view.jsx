import React from 'react';
import { Container } from 'reactstrap';
import Router from 'next/router';
import nextCookie from 'next-cookies';
import ApplicationsList from '../frontend/components/ApplicationsList';
import config from '../config';

class ViewPage extends React.Component {
  static async getInitialProps(ctx) {
    const { token } = nextCookie(ctx);

    const jwt = require('jsonwebtoken');
    let isValid = true;
    try {
      jwt.verify(token, 'secret');
    } catch (e) {
      isValid = false;
    }

    if (!isValid) {
      if (typeof window === 'undefined') {
        ctx.res.writeHead(302, {
          Location: config.pages.login,
        });
        ctx.res.end();
      } else {
        Router.push(config.pages.login);
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
