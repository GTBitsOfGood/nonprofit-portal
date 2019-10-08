import React from 'react';
import { Container } from 'reactstrap';
import AppNavbar from '../frontend/components/AppNavbar';
import WelcomeJumbo from '../frontend/components/WelcomeJumbo'
import ApplicationList from '../frontend/components/ApplicationList';

class IndexPage extends React.Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <WelcomeJumbo />
          <ApplicationList />
        </Container>
      </div>
    );
  }
}

export default IndexPage;
