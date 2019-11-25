import React from 'react';
import Router from 'next/router';
import config from '../config';

class IndexPage extends React.PureComponent {
  static async getInitialProps(ctx) {
    if (ctx.res) {
      ctx.res.writeHead(302, {
        Location: config.pages.application,
      });
      ctx.res.end();
    } else {
      await Router.push(config.pages.application);
    }
  }

  render() {
    return (
      <div />
    );
  }
}

export default IndexPage;
