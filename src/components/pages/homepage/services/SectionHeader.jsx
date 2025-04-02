// SectionHeader.jsx
import React from "react";
import PropTypes from "prop-types";

/**
 * Renders the header for a section with title and subtitle
 */
const SectionHeader = ({ title, subtitle }) => (
  <div
    className="container mx-auto px-4 text-center mb-8"
    style={{ margin: "0 auto", marginBottom: "2rem" }}
  >
    <h2
      className="text-3xl md:text-5xl font-bold text-white mb-4"
      style={{ margin: "0 0 1rem 0" }}
    >
      {title}
    </h2>
    <p className="text-white text-base md:text-lg" style={{ margin: 0 }}>
      {subtitle}
    </p>
  </div>
);

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

export default SectionHeader;
