import React from 'react';
import PropTypes from 'prop-types';
import StatusCircle from './StatusCircle';
import StatusLine from './StatusLine';
import StatusLabel from './StatusLabel';

const StatusBar = (props) => {
  const { status } = props;

  const getCircleStatus = (target) => {
    if (status > target) {
      return 0;
    }
    if (status === target) {
      return 1;
    }
    return 2;
  };

  const getLineStatus = (target) => {
    if (status >= target) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}
      >
        <StatusCircle status={getCircleStatus(0)} />
        <StatusLine status={getLineStatus(1)} />
        <StatusCircle status={getCircleStatus(1)} />
        <StatusLine status={getLineStatus(2)} />
        <StatusCircle status={getCircleStatus(2)} />
        <StatusLine status={getLineStatus(3)} />
        <StatusCircle status={getCircleStatus(3)} />
      </div>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        marginTop: '10px',
        fontSize: '13px',
      }}
      >
        <StatusLabel label="Application submitted" status={getCircleStatus(0)} />
        <StatusLabel label="Under review" status={getCircleStatus(1)} />
        <StatusLabel label="Interview scheduled" status={getCircleStatus(2)} />
        <StatusLabel label="Decision made" status={getCircleStatus(3)} />
      </div>
    </div>
  );
};

StatusBar.propTypes = {
  status: PropTypes.number.isRequired,
};

export default StatusBar;
