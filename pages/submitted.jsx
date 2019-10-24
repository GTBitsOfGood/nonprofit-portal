import React from 'react';
import { Container, Progress } from 'reactstrap';
import AppNavbar from '../frontend/components/AppNavbar';

function IndexPage() {
  return (
    <div className="App">
      <AppNavbar />
      <Container style={{ textAlign: 'center' }}>
        <h1>Thank you so much for your interest!</h1>
        <Progress
          animated
          color="success"
          value="25"
          className="progress-bar"
        />
        <p>
          Your application has been submitted to the BoG team successfully!
          You will get an email notification after we finish reviewing your application.
          If we decide to move on with your project, the next step will be an interview
          to better understand your project and if it’s a good fit for Bits of Good.
        </p>
      </Container>
    </div>
  );
}

export default IndexPage;
