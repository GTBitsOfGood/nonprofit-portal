/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import AppNavbar from '../frontend/components/AppNavbar';

class IndexPage extends React.Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
      </div>
    );
  }
}

export default IndexPage;
