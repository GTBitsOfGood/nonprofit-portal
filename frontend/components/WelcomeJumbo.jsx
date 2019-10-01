import React from 'react';
import {
  Jumbotron, Button,
} from 'reactstrap';

const WelcomeJumbo = () => {
  return (
    <div>
      <div style={{background: 'transparent'}} className="Jumbotron">
        <h4 style={{font: 'Open Sans'}} align="center">Online Application</h4>
        <p className="lead" align="center">As a partner, Bits of Good will help you build software that turns your need into real product. Please fill out the following form so that we can best understand your mission and need!</p>
      </div>
    </div>
  );
}

export default WelcomeJumbo
