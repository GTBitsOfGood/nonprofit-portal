import React from 'react';
import { Container } from 'reactstrap';
import WelcomeJumbo from '../frontend/components/Application/WelcomeJumbo';
import ApplicationForm from '../frontend/components/Application/ApplicationForm';

export default () => (
  <Container>
    <WelcomeJumbo />
    <ApplicationForm />
  </Container>
);
