import React from 'react';
import { Container } from 'reactstrap';
import AppNavbar from '../frontend/components/AppNavbar';
import WelcomeJumbo from '../frontend/components/WelcomeJumbo'
import ApplicationForm from '../frontend/components/ApplicationForm';

class IndexPage extends React.Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <WelcomeJumbo />
          <ApplicationForm />
        </Container>
      </div>
    );
  }
}

export default IndexPage;
