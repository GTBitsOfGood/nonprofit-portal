import React from "react";
import PropTypes from "prop-types";

const StatusJumbo = (props) => {
  const { status, name, decision } = props;

  const getMessage = () => {
    switch (status) {
      default:
        return `Thank you so much for your interest, ${name}!`;
      case 1:
        return `We have reviewed your application, ${name}!`;
      case 2:
        return `Let's meet and talk about the project, ${name}!`;
      case 3:
        return `We are working on your application, ${name}!`;
      case 4:
        if (decision === true)
          return `We look forward to working with you, ${name}!`;
        return `Perhaps next time, ${name}!`;
    }
  };

  return (
    <div>
      <div
        style={{
          background: "transparent",
          marginBottom: "30px",
        }}
        className="Jumbotron"
      >
        <h4
          style={{
            font: "Open Sans",
            fontWeight: 600,
          }}
          align="center"
        >
          {getMessage(status)}
        </h4>
      </div>
    </div>
  );
};

StatusJumbo.defaultProps = {
  decision: null,
};

StatusJumbo.propTypes = {
  status: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  decision: PropTypes.bool,
};

export default StatusJumbo;
