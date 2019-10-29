import React from 'react';
import { Container } from 'reactstrap';
import AppNavbar from '../frontend/components/AppNavbar';
import ApplicationsList from '../frontend/components/ApplicationsList';

function IndexPage() {
  return (
    <div className="App">
      <AppNavbar />
      <Container>
        <ApplicationsList />
      </Container>
    </div>
  );
}

export default IndexPage;
