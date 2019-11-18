import React from 'react';
import { Container } from 'reactstrap';
import AppNavbar from '../frontend/components/AppNavbar';
import WelcomeJumbo from '../frontend/components/Application/WelcomeJumbo';
import ApplicationForm from '../frontend/components/Application/ApplicationForm';

export default () => (
  <div className="App">
    <AppNavbar />
    <Container>
      <WelcomeJumbo />
      <ApplicationForm />
    </Container>
  </div>
);
