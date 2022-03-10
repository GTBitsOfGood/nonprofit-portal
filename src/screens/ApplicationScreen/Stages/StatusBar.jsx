import React from "react";
import PropTypes from "prop-types";
import StatusCircle from "./StatusCircle";
import StatusLine from "./StatusLine";
import StatusLabel from "./StatusLabel";

const getCircleStatus = (status, target) => {
  if (status > target) {
    return 0;
  }

  if (status === target) {
    return 1;
  }

  return 2;
};

const getLineStatus = (status, target) => status >= target;

const StatusBar = (props) => {
  const { status } = props;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <StatusCircle status={getCircleStatus(status, 0)} />
        <StatusLine status={getLineStatus(status, 1)} />
        <StatusCircle status={getCircleStatus(status, 1)} />
        <StatusLine status={getLineStatus(status, 2)} />
        <StatusCircle status={getCircleStatus(status, 2)} />
        <StatusLine status={getLineStatus(status, 3)} />
        <StatusCircle status={getCircleStatus(status, 3)} />
        <StatusLine status={getLineStatus(status, 4)} />
        <StatusCircle status={getCircleStatus(status, 4)} />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "10px",
          fontSize: "13px",
        }}
      >
        <StatusLabel
          label="Application submitted"
          status={getCircleStatus(status, 0)}
        />
        <StatusLabel
          label="Schedule interview"
          status={getCircleStatus(status, 1)}
        />
        <StatusLabel
          label="Interview scheduled"
          status={getCircleStatus(status, 2)}
        />
        <StatusLabel label="Under review" status={getCircleStatus(status, 3)} />
        <StatusLabel
          label="Decision made"
          status={getCircleStatus(status, 4)}
        />
      </div>
    </div>
  );
};

StatusBar.propTypes = {
  status: PropTypes.number.isRequired,
};

export default StatusBar;
