import React from "react";
import PropTypes from "prop-types";

const LandingBodyMessage = (props) => {
  const { children, width } = props;

  return (
    <p
      style={{
        width: `${width}px`,
        textAlign: "center",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      {children}
    </p>
  );
};

LandingBodyMessage.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.number.isRequired,
};

export default LandingBodyMessage;
