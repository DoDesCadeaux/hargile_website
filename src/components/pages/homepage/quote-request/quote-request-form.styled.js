import styled, { css } from "styled-components";
import React from "react";

export const PageWrapper = styled.div`
  min-height: 100vh;
  position: relative;
  contain-content: true;
`;

export const BackgroundBlur = styled.div`
  position: absolute;
  top: 25vh;
  left: calc(50% - 30rem);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #a855f7;
  opacity: 0.4;
  filter: blur(40px);
  transform: scale(6);
  z-index: 0;
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

export const TitleUnderline = styled.div`
  width: 30%;
  height: 2px;
  background-color: #a855f7;
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
    color: #a855f7;
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

export const ContactInfoColumn = styled.div`
  background-color: rgba(17, 12, 41, 0.6);
  border: 1px solid rgba(147, 51, 234, 0.2);
  border-radius: 0.5rem;
  padding: 2.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);

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

export const ServiceTypesColumn = styled.div`
  background-color: rgba(21, 16, 53, 0.8);
  border: 1px solid rgba(147, 51, 234, 0.1);
  border-radius: 0.5rem;
  padding: 2.5rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;

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
`;

export const RequiredMark = styled.span`
  color: #f87171;
`;

export const Input = styled.input`
  width: 100%;
  background-color: #19103b;
  color: white;
  border-radius: 0.375rem;
  padding: 1rem;
  outline: none;
  border: 1px solid
    ${(props) => (props.hasError ? "#EF4444" : "rgba(107, 33, 168, 0.1)")};

  &:focus {
    border-color: #a855f7;
  }
`;

export const TextArea = styled.textarea`
  width: 100%;
  background-color: #19103b;
  color: white;
  border-radius: 0.375rem;
  padding: 1rem;
  outline: none;
  border: 1px solid
    ${(props) => (props.hasError ? "#EF4444" : "rgba(107, 33, 168, 0.1)")};

  &:focus {
    border-color: #a855f7;
  }
`;

export const SelectButton = styled.button.attrs({
  className: "fluid-type-0",
})`
  position: relative;
  appearance: none;
  width: 100%;
  background-color: #19103b;
  color: white;
  border-radius: 0.375rem;
  padding: 1rem;
  padding-right: 2.5rem;
  outline: none;
  border: 1px solid
    ${(props) => (props.hasError ? "#EF4444" : "rgba(107, 33, 168, 0.1)")};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  span.text-content {
    /* Added a specific class for the text content */
    display: block;
    width: calc(100% - 2rem); /* Adjust width to make space for the icon */
    text-align: center; /* Changed from center to left */
  }

  .icon {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0; /* Keep icon at the right */
    display: flex;
    align-items: center;
    padding-right: 0.75rem;
    color: white;
    pointer-events: none; /* Make sure clicks pass through to the button */

    .icon-up,
    .icon-down {
      height: 1.25rem;
      width: 1.25rem;
      transition: transform 0.2s ease;
    }
  }

  &:focus {
    border-color: #a855f7;
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
  background-color: #19103b;
  border: 1px solid rgba(107, 33, 168, 0.2);
  outline: none;
`;

export const DropdownItem = styled.button.attrs({
  className: "fluid-type--1",
})`
  display: block;
  padding: 0.5rem 1rem;
  color: white;
  cursor: pointer;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #7e22ce;
    color: white;
  }
`;

export const ServiceDescription = styled.p.attrs({
  className: "fluid-type-0",
})`
  color: white;
  margin-bottom: 1rem;
`;


// Create a React component to handle prop filtering
export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s ease;
  cursor: pointer;
  background-color: var(--bg-color, transparent);

  &:hover {
    background-color: var(--bg-hover-color, rgba(75, 85, 99, 0.1));
  }
`;

export const Checkbox = styled.button.attrs((props) => {
  // Filter out custom props that shouldn't be passed to the DOM
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
      background-color: ${isChecked ? color : "#190f3a"};
      border: 1px solid ${isChecked ? color : color};
    `;
  }}
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

export const SubmitButton = styled.button.attrs({
  className: "fluid-type-0",
})`
  margin-top: 2rem;
  background-color: #2563eb;
  color: white;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  transition: background-color 150ms ease-in-out;
  width: 100%;

  &:hover {
    background-color: #1d4ed8;
  }
`;

export const PrivacyNote = styled.div.attrs({
  className: "fluid-type--1",
})`
  margin-top: 1.5rem;
  color: white;
  padding: 0 1rem;
`;

export const PrivacyLink = styled.a`
  color: #60a5fa;

`;

export const RequiredNote = styled.p`
  margin-top: 0.75rem;
`;
