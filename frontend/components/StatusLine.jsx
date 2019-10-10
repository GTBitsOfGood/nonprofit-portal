import React from 'react';
import PropTypes from 'prop-types';

const StatusLine = (props) => {
  const { status } = props;

  const getColor = () => {
    if (status === true) {
      return 'black';
    }
    return 'lightgray';
  };

  return (
    <div style={{
      width: '110px',
      height: '2px',
      borderRadius: '1px',
      backgroundColor: getColor(),
      float: 'left',
      marginLeft: '3px',
      marginRight: '3px',
      marginTop: '22px',
    }}
    />
  );
};

StatusLine.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default StatusLine;
