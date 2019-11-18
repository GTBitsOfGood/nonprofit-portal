import React from 'react';
import { Container } from 'reactstrap';
import WelcomeJumbo from '../frontend/components/WelcomeJumbo';
import ApplicationForm from '../frontend/components/ApplicationForm';

export default () => (
  <Container>
    <WelcomeJumbo />
    <ApplicationForm />
  </Container>
);
