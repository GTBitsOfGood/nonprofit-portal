import React from 'react';
import { Container } from 'reactstrap';
import AppNavbar from '../frontend/components/AppNavbar';
import WelcomeJumbo from '../frontend/components/WelcomeJumbo';
import ApplicationForm from '../frontend/components/ApplicationForm';

export default () => (
  <div className="App">
    <AppNavbar />
    <Container>
      <WelcomeJumbo />
      <ApplicationForm />
    </Container>
  </div>
);
