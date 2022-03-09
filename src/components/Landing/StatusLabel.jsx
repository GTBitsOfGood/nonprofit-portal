import React from "react";
import PropTypes from "prop-types";

const StatusLabel = (props) => {
  const { label, status } = props;

  return (
    <div
      style={{
        textAlign: "center",
        width: "138px",
        float: "left",
        color: status < 2 ? "black" : "gray",
        fontWeight: status === 1 ? "bold" : "normal",
        whiteSpace: "nowrap",
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
