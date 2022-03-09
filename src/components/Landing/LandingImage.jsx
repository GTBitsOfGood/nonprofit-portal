import React from "react";
import PropTypes from "prop-types";

const LandingImage = (props) => {
  const { src, alt } = props;

  return (
    <img
      alt={alt}
      src={src}
      style={{
        width: "500px",
        display: "block",
        marginTop: "75px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    />
  );
};

LandingImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default LandingImage;
