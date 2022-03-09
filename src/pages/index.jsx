import React from 'react';
import { Container } from 'reactstrap';
import WelcomeJumbo from '../components/Application/WelcomeJumbo';
import ApplicationForm from '../components/Application/ApplicationForm';

export default () => (
  <Container>
    <WelcomeJumbo />
    <ApplicationForm />
  </Container>
);
