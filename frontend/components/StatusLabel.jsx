import React from 'react';
import PropTypes from 'prop-types';

const StatusLabel = (props) => {
  const { label, status } = props;

  const getFontColor = () => {
    if (status < 2) {
      return 'black';
    }
    return 'gray';
  };

  const getFontWeight = () => {
    if (status === 1) {
      return 'bold';
    }
    return 'normal';
  };

  return (
    <div style={{
      textAlign: 'center',
      width: '138px',
      float: 'left',
      color: getFontColor(),
      fontWeight: getFontWeight(),
      whiteSpace: 'nowrap',
    }}
    >
      {label}
    </div>
  );
};

StatusLabel.propTypes = {
  label: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
};

export default StatusLabel;
