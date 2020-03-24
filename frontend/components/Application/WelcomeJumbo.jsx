import React from 'react';

const WelcomeJumbo = () => (
  <div>
    <div style={{ background: 'transparent' }} className="Jumbotron">
      <img src="/static/bog_logo.svg" alt="Bits of Good" style={{display: 'block', marginLeft: 'auto', marginRight: 'auto', marginBottom: '5px', width: '230px'}} />
      <h4 align="center">Nonprofit Application</h4>
      <p className="lead" align="center">
        As a partner, Bits of Good will help you build software that turns your need into
        real product. Please fill out the following form so that we can best understand
        your mission and need!
      </p>
    </div>
  </div>
);

export default WelcomeJumbo;
