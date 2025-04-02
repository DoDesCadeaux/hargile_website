import styled, { css, keyframes } from "styled-components";
import React from "react";

export const PageWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  contain-content: true;
`;

/* Enhanced BackgroundBlur with animation */
const pulseAnimation = keyframes`
  0% { transform: scale(6); opacity: 0.4; }
  50% { transform: scale(6.5); opacity: 0.5; }
  100% { transform: scale(6); opacity: 0.4; }
`;

export const BackgroundBlur = styled.div`
  position: absolute;
  top: 25vh;
  left: calc(50% - 30rem);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: var(--color-accent-mihai);
  opacity: 0.4;
  filter: blur(40px);
  transform: scale(6);
  z-index: 0;
  animation: ${pulseAnimation} 8s ease-in-out infinite;
`;

export const FormContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 10;
  width: 100%;
`;

export const HeaderSection = styled.div`
  margin-bottom: 3rem;
  padding: 0 1rem;
`;

export const PageTitle = styled.h1.attrs({
  className: "fluid-type-4",
})`
  font-weight: bold;
  color: white;
  margin-bottom: 0.5rem;
`;

const shimmerAnimation = keyframes`
  0% { background-position: -200% center; }
  100% { background-position: 200% center; }
`;

export const TitleUnderline = styled.div`
  width: 30%;
  height: 2px;
  background: linear-gradient(
    90deg,
    rgba(147, 51, 234, 0.2),
    var(--color-accent-mihai),
    rgba(147, 51, 234, 0.2)
  );
  background-size: 200% auto;
  animation: ${shimmerAnimation} 3s linear infinite;
  margin-bottom: 1.5rem;
`;

export const SubTitle = styled.h2.attrs({
  className: "fluid-type-2",
})`
  font-weight: 600;
  color: white;
  margin-bottom: 1rem;
  margin-top: 1rem;

  span {
    color: var(--color-accent-mihai);
    text-shadow: 0 0 15px rgba(147, 51, 234, 0.3);
  }
`;

export const Description = styled.p.attrs({
  className: "fluid-type-0",
})`
  color: white;
  line-height: 1.6;
  margin-bottom: 1rem;
  width: 100%; /* Default width for mobile */

  /* Media query for desktop/larger screens */
  @media (min-width: 768px) {
    width: 40%;
  }
`;

export const FormGrid = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 0 1rem;

  @media (min-width: 1024px) {
    grid-template-columns: 2fr 1fr;
  }
`;

/* Enhanced ContactInfoColumn with glassmorphism */
export const ContactInfoColumn = styled.div`
  background-color: rgba(17, 12, 41, 0.6);
  margin: 10px;
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 0.75rem;
  padding: 2.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 20px 30px -5px rgba(0, 0, 0, 0.2),
      0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 0 15px rgba(147, 51, 234, 0.3);
    transform: translateY(-3px);
  }

  @media (min-width: 768px) {
    background-color: rgba(17, 12, 41, 0.6);
  }

  .grid-cols-2 {
    @media (min-width: 768px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
    }
  }

  .error-message {
    color: #ef4444;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }

  .relative {
    position: relative;
  }
`;

/* Enhanced ServiceTypesColumn with glassmorphism */
export const ServiceTypesColumn = styled.div`
  background-color: rgba(21, 16, 53, 0.6);
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 0.75rem;
  padding: 2.5rem;
  margin: 10px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 20px 30px -5px rgba(0, 0, 0, 0.2),
      0 10px 15px -5px rgba(0, 0, 0, 0.1), 0 0 15px rgba(147, 51, 234, 0.3);
    transform: translateY(-3px);
  }

  @media (min-width: 768px) {
    background-color: rgba(21, 16, 53, 0.6);
  }

  .service-options {
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }
`;

export const SectionTitle = styled.h3.attrs({
  className: "fluid-type-1",
})`
  font-weight: 600;
  color: white;
  margin-bottom: 1.5rem;
  position: relative;
  display: inline-block;

  &:after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 40%;
    height: 2px;
    background: linear-gradient(
      90deg,
      var(--color-accent-mihai),
      rgba(147, 51, 234, 0.1)
    );
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const InputLabel = styled.label.attrs({
  className: "fluid-type-0",
})`
  display: block;
  color: white;
  margin-bottom: 0.5rem;
  padding-top: 1rem;
  font-weight: 500;
`;

export const RequiredMark = styled.span`
  color: #f87171;
`;

/* Enhanced Input with subtle glow effect */
export const Input = styled.input`
  width: 100%;
  background-color: rgba(25, 16, 59, 1);
  color: white;
  border-radius: 0.375rem;
  padding: 1rem;
  outline: none;
  border: 1px solid
    ${(props) => (props.hasError ? "#EF4444" : "rgba(147, 51, 234, 0.15)")};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: var(--color-accent-mihai);
    box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.15);
  }
`;

/* Enhanced TextArea with subtle glow effect */
export const TextArea = styled.textarea`
  width: 100%;
  background-color: rgba(25, 16, 59, 0.8);
  color: white;
  border-radius: 0.375rem;
  padding: 1rem;
  outline: none;
  border: 1px solid
    ${(props) => (props.hasError ? "#EF4444" : "rgba(147, 51, 234, 0.15)")};
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &:focus {
    border-color: var(--color-accent-mihai);
    box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.15);
  }
`;

/* Enhanced SelectButton with subtle glow effect */
export const SelectButton = styled.button.attrs({
  className: "fluid-type-0",
})`
  position: relative;
  appearance: none;
  width: 100%;
  background-color: rgba(25, 16, 59, 0.8);
  color: white;
  border-radius: 0.375rem;
  padding: 1rem;
  padding-right: 2.5rem;
  outline: none;
  border: 1px solid
    ${(props) => (props.hasError ? "#EF4444" : "rgba(147, 51, 234, 0.15)")};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  span.text-content {
    display: block;
    width: calc(100% - 2rem);
    text-align: center;
  }

  .icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    display: flex;
    align-items: center;
    padding-right: 0.75rem;
    color: white;
    pointer-events: none;

    .icon-up,
    .icon-down {
      height: 1.25rem;
      width: 1.25rem;
      transition: transform 0.2s ease;
    }
  }

  &:focus {
    border-color: var(--color-accent-mihai);
    box-shadow: 0 0 0 2px rgba(147, 51, 234, 0.15);
  }
`;

export const DropdownContainer = styled.div`
  position: absolute;
  z-index: 10;
  margin-top: 0.25rem;
  width: 100%;
  border-radius: 0.375rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05);
  background-color: rgba(25, 16, 59, 0.9);
  border: 1px solid rgba(147, 51, 234, 0.2);
  outline: none;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
`;

export const DropdownItem = styled.button.attrs({
  className: "fluid-type-1",
})`
  display: block;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  width: 100%;
  text-align: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(126, 34, 206, 0.7);
    color: white;
  }
`;

export const ServiceDescription = styled.p.attrs({
  className: "fluid-type-0",
})`
  color: white;
  margin-bottom: 1rem;
`;

/* Enhanced CheckboxContainer with subtle hover effect */
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.85rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;
  cursor: pointer;
  background-color: var(--bg-color, rgba(25, 16, 59, 0.4));
  border: 1px solid rgba(147, 51, 234, 0.05);

  &:hover {
    background-color: var(--bg-hover-color, rgba(147, 51, 234, 0.1));
    transform: translateX(3px);
  }
`;

export const Checkbox = styled.button.attrs((props) => {
  const { checked, color, ...domProps } = props;
  return {
    ...domProps,
    type: props.type || "button",
  };
})`
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.75rem;
  transition: all 0.2s ease;

  ${(props) => {
    const colors = {
      blue: "#3B82F6",
      purple: "#8B5CF6",
      pink: "#EC4899",
      teal: "#14B8A6",
    };

    const color = colors[props.color] || colors.blue;
    const isChecked = props.checked;

    return `
      background-color: ${isChecked ? color : "rgba(25, 15, 58, 0.8)"};
      border: 1px solid ${isChecked ? color : color};
      box-shadow: ${isChecked ? `0 0 10px rgba(${color}, 0.3)` : "none"};
    `;
  }}

  &:hover {
    transform: scale(1.05);
  }
`;

export const CheckMark = styled.svg`
  height: 1rem;
  width: 1rem;
  color: white;
`;

export const CheckboxLabel = styled.label.attrs({
  className: "fluid-type-0",
})`
  color: white;
  cursor: pointer;
  padding-left: 0.25rem;
`;

/* Enhanced SubmitButton with glowing effect */
export const SubmitButton = styled.button.attrs({
  className: "fluid-type-0",
})`
  margin-top: 2rem;
  background: linear-gradient(135deg, #2563eb, #4f46e5);
  color: white;
  font-weight: 500;
  padding: 0.85rem 1.5rem;
  border-radius: 0.375rem;
  transition: all 0.3s ease;
  width: 100%;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    z-index: -1;
    background: linear-gradient(90deg, #2563eb, #4f46e5, #2563eb);
    background-size: 200%;
    border-radius: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    transform: translateY(-2px);
    background: linear-gradient(135deg, #1d4ed8, #4338ca);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.2),
      0 4px 6px -2px rgba(0, 0, 0, 0.1);

    &:before {
      opacity: 1;
      animation: ${shimmerAnimation} 2s infinite;
    }
  }

  &:active {
    transform: translateY(0);
  }
`;

export const PrivacyNote = styled.div.attrs({
  className: "fluid-type-1",
})`
  margin-top: 1.5rem;
  color: white;
  padding: 0 1rem;
`;

export const PrivacyLink = styled.a`
  color: #60a5fa;
  position: relative;
  text-decoration: none;

  &:after {
    content: "";
    position: absolute;
    width: 100%;
    height: 1px;
    bottom: -2px;
    left: 0;
    background-color: #60a5fa;
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease;
  }

  &:hover:after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

export const RequiredNote = styled.p`
  margin-top: 0.75rem;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
`;
