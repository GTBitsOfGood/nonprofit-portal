import React from 'react';
import PropTypes from 'prop-types';

const LandingBody = (props) => {
  const { status } = props;

  switch (status) {
    default:
      break;
    case 0:
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
  }
};

LandingBody.propTypes = {
  status: PropTypes.number.isRequired,
};

export default LandingBody;
