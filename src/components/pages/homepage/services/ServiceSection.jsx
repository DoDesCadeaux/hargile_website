// ServiceSection.jsx
import React from "react";
import PropTypes from "prop-types";
import { DOT_COLORS } from "./constants";
import ServiceItem from "./ServiceItem";

/**
 * Renders a section of services with title, icon and list of items
 */
const ServiceSection = ({ icon, title, items, position }) => {
  const isRight = position.includes("right");

  return (
    <div className={isRight ? "text-right" : "text-left"}>
      <div
        className="flex items-center mb-6"
        style={{ margin: "0 0 1.5rem 0" }}
      >
        <div className="mr-4" style={{ margin: "0 1rem 0 0" }}>
          {icon}
        </div>
        <h3
          className="fluid-type-2 md:text-2xl font-bold text-white"
          style={{ margin: 0 }}
        >
          {title}
        </h3>
      </div>
      <div>
        {items.map((item, index) => (
          <ServiceItem key={index} color={DOT_COLORS[position]} text={item} />
        ))}
      </div>
    </div>
  );
};

ServiceSection.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  position: PropTypes.oneOf(Object.keys(DOT_COLORS)).isRequired,
};

export default ServiceSection;
