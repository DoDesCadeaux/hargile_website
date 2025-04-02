// ServiceItem.jsx
import React from "react";
import PropTypes from "prop-types";

/**
 * Renders a single service item with a colored dot and text
 */
const ServiceItem = ({ color, text }) => (
  <div className="flex items-center mb-4" style={{ margin: "0 0 1rem 0" }}>
    <div
      className="w-3 h-3 rounded-full mr-4"
      style={{
        backgroundColor: color,
        margin: "0 1rem 0 0",
        width: "0.75rem",
        height: "0.75rem",
      }}
    />
    <span className="text-white fluid-type-1 md:text-lg" style={{ margin: 0 }}>
      {text}
    </span>
  </div>
);

ServiceItem.propTypes = {
  color: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default ServiceItem;
