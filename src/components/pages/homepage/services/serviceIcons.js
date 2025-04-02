// serviceIcons.js
import React from "react";
import { POSITIONS } from "./constants";

/**
 * Creates a set of icons for the services section
 * @param {boolean} isMobile - Whether the view is in mobile mode
 * @returns {Object} Object containing icons for each position
 */
export const getServiceIcons = (isMobile) => {
  const iconSize = isMobile ? 32 : 48;

  return {
    [POSITIONS.TOP_LEFT]: (
      <img
        src="/icons/services/globe.svg"
        alt="Web Development"
        width={iconSize}
        height={iconSize}
        style={{
          filter:
            "invert(43%) sepia(98%) saturate(1677%) hue-rotate(202deg) brightness(102%) contrast(96%)",
        }}
      />
    ),
    [POSITIONS.BOTTOM_LEFT]: (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6 24H12L18 6L30 42L36 24H42"
          stroke="#EC4899"
          strokeWidth="2"
        />
      </svg>
    ),
    [POSITIONS.TOP_RIGHT]: (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="8" stroke="#10B981" strokeWidth="2" />
        <path
          d="M24 8V2M24 46V40M8 24H2M46 24H40M12 12L8 8M36 36L40 40M12 36L8 40M36 12L40 8"
          stroke="#10B981"
          strokeWidth="2"
        />
      </svg>
    ),
    [POSITIONS.BOTTOM_RIGHT]: (
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M6 6V42H42" stroke="#A855F7" strokeWidth="2" />
        <path d="M14 30V34" stroke="#A855F7" strokeWidth="2" />
        <path d="M22 26V34" stroke="#A855F7" strokeWidth="2" />
        <path d="M30 18V34" stroke="#A855F7" strokeWidth="2" />
        <path d="M38 10V34" stroke="#A855F7" strokeWidth="2" />
      </svg>
    ),
  };
};
