import React from "react";
import styled from "styled-components";

/**
 * Creates a blurred circular background
 * @param {string} color - CSS color value
 * @param {string} size - Size of the blur in pixels
 * @param {number} intensity - Scale factor for the blur effect
 * @param {number} opacity - Opacity of the blur (0-1)
 * @returns {JSX.Element} Styled blur background component
 */
const BlurBackground = ({
  color,
  size = "50px",
  intensity = 2,
  opacity = 0.1,
}) => {
  const StyledBlur = styled.div`
    position: absolute;
    width: ${size};
    height: ${size};
    border-radius: 50%;
    background-color: ${color};
    opacity: ${opacity};
    filter: blur(40px);
    transform: scale(${intensity});
    z-index: -99;
  `;

  return <StyledBlur />;
};

export default BlurBackground;
