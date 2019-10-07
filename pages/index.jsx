/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { Container, Button } from 'reactstrap';
import AppNavbar from '../frontend/components/AppNavbar';

class IndexPage extends React.Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <a href="/application">
            <Button>Apply Here</Button>
          </a>
        </Container>
      </div>
    );
  }
}

export default IndexPage;
