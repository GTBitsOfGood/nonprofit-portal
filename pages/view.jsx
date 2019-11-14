import React from 'react';
import { Container } from 'reactstrap';
import { useSession } from 'next-session';
import Router from 'next/router';
import ApplicationsList from '../frontend/components/ApplicationsList';

class IndexPage extends React.PureComponent {
  static async getInitialProps({ req, res }) {
    const user = await useSession(req, res);

    console.log('user', user)

    const isLoggedIn = user != null && user.userId != null;
    console.log('isLoggedIn', isLoggedIn)

    if (!isLoggedIn) {
      if (res) {
        res.writeHead(302, {
          Location: '/',
        });
        res.finished = true;
        res.end();
      } else {
        await Router.push('/');
      }
    } else {
      return {
        user,
      };
    }
  }

  render() {
    return (
      <Container>
        <ApplicationsList />
      </Container>
    );
  }
}

export default IndexPage;
