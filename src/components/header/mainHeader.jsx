import React from "react";
import styled from "styled-components";

// Styled components for the header
const HeaderSection = styled.header`
  margin-bottom: 3rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
`;

const TitleUnderline = styled.div`
  width: 160px;
  height: 4px;
  background: linear-gradient(90deg, #9333ea, #4f46e5);
  margin-bottom: 1.5rem;
`;

const SubTitle = styled.h2`
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.3;

  span {
    color: white;
  }

  .highlight {
    color: #9333ea;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: #cbd5e1;
  max-width: 600px;
`;

/**
 * A reusable header component that can be used across different pages
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Main title text
 * @param {string} props.subtitleRegular - Regular text portion of subtitle
 * @param {string} props.subtitleHighlight - Highlighted text portion of subtitle
 * @param {string} props.description - Description text
 * @param {boolean} props.showUnderline - Whether to show the underline (default: true)
 * @returns {JSX.Element} Header component
 */
export function Header({
  title,
  subtitleRegular = "",
  subtitleHighlight = "",
  description = "",
  showUnderline = true,
}) {
  return (
    <HeaderSection>
      <PageTitle>{title}</PageTitle>
      {showUnderline && <TitleUnderline />}

      {(subtitleRegular || subtitleHighlight) && (
        <SubTitle>
          {subtitleRegular && <span>{subtitleRegular}</span>}
          {subtitleRegular && subtitleHighlight && <br />}
          {subtitleHighlight && (
            <span className="highlight">{subtitleHighlight}</span>
          )}
        </SubTitle>
      )}

      {description && <Description>{description}</Description>}
    </HeaderSection>
  );
}

export { HeaderSection, PageTitle, TitleUnderline, SubTitle, Description };
