import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faDotCircle, faCircle } from '@fortawesome/free-solid-svg-icons';

const getIcon = (status) => {
  if (status === 0) {
    return <FontAwesomeIcon icon={faCheckCircle} size="sm" />;
  }

  if (status === 1) {
    return <FontAwesomeIcon icon={faDotCircle} size="sm" />;
  }

  return <FontAwesomeIcon icon={faCircle} color="lightgray" size="sm" />;
};

const StatusCircle = (props) => {
  const { status } = props;

  return (
    <div style={{
      float: 'left',
      paddingLeft: '3px',
      paddingRight: '3px',
      paddingTop: '10px',
    }}
    >
      {getIcon(status)}
    </div>
  );
};

StatusCircle.propTypes = {
  status: PropTypes.number.isRequired,
};

export default StatusCircle;
