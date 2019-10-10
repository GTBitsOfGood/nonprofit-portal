import React from 'react';
import PropTypes from 'prop-types';

const StatusJumbo = (props) => {
  const { status } = props;

  const getMessage = () => {
    switch (status) {
      default:
        return 'Thank you so much for your interest!';
      case 1:
        return 'We are reviewing your application!';
      case 2:
        return 'Let\'s meet and talk about the project!';
      case 3:
        return 'We have made a decision.';
    }
  };

  return (
    <div>
      <div style={{ background: 'transparent', marginBottom: '30px' }} className="Jumbotron">
        <h4 style={{ font: 'Open Sans', fontWeight: 600 }} align="center">{getMessage()}</h4>
      </div>
    </div>
  );
};

StatusJumbo.propTypes = {
  status: PropTypes.number.isRequired,
};

export default StatusJumbo;
