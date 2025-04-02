import React from "react";
import { POSITIONS } from "./constants";
// Import from lucide-react
import { BrainCircuit, Laptop, ChartNoAxesCombined, Globe } from "lucide-react";
// Import the BlurBackground component
import BlurBackground from "@/components/BlurBackground";

/**
 * Creates a set of icons for the services section
 * @param {boolean} isMobile - Whether the view is in mobile mode
 * @returns {Object} Object containing icons for each position
 */
export const getServiceIcons = (isMobile) => {
  const iconSize = isMobile ? 40 : 65;

  // Define colors for consistency
  const colors = {
    laptopColor: "#E56062",
    brainColor: "#10B981",
    chartColor: "#A855F7",
    globeColor: "#3B82F6",
  };

  return {
    [POSITIONS.TOP_LEFT]: (
      <div style={{ position: "relative" }}>
        <Globe
          size={iconSize}
          color={colors.globeColor}
          style={{ position: "relative", zIndex: 1 }}
          strokeWidth="1px"
        />
        {/* Blue blur for globe icon */}
        <BlurBackground
          color="#3B82F6"
          size={`${iconSize}px`}
          intensity={isMobile ? 4 : 6}
        />
      </div>
    ),
    [POSITIONS.BOTTOM_LEFT]: (
      <div style={{ position: "relative" }}>
        <Laptop
          size={iconSize}
          color={colors.laptopColor}
          style={{ position: "relative", zIndex: 1 }}
          strokeWidth="1px"
        />
        <BlurBackground
          color={colors.laptopColor}
          size={`${iconSize}px`}
          intensity={isMobile ? 4 : 6}
        />
      </div>
    ),
    [POSITIONS.TOP_RIGHT]: (
      <div style={{ position: "relative" }}>
        <BrainCircuit
          size={iconSize}
          color={colors.brainColor}
          strokeWidth="1px"
          style={{ position: "relative", zIndex: 1 }}
        />
        <BlurBackground
          color={colors.brainColor}
          size={`${iconSize}px`}
          intensity={isMobile ? 4 : 6}
        />
      </div>
    ),
    [POSITIONS.BOTTOM_RIGHT]: (
      <div style={{ position: "relative" }}>
        <ChartNoAxesCombined
          size={iconSize}
          color={colors.chartColor}
          strokeWidth="1px"
          style={{ position: "relative", zIndex: 1 }}
        />
        <BlurBackground
          color={colors.chartColor}
          size={`${iconSize}px`}
          intensity={isMobile ? 4 : 6}
        />
      </div>
    ),
  };
};
