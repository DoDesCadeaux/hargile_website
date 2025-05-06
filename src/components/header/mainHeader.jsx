"use client";

import React from "react";
import styled from "styled-components";

// Styled components for the header
const HeaderSection = styled.header`
    position: relative;
    margin-bottom: 3rem;
`;

const BackgroundBlur = styled.div`
    position: absolute;
    top: 15vh;
    left: calc(50% - 35rem);
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: var(--color-accent-mihai);
    opacity: 0.4;
    filter: blur(40px);
    transform: scale(6);
    z-index: -10;
`;

const TitleWrapper = styled.div`
    position: relative;
    display: inline-block;
    margin-bottom: 1rem;
`;

const PageTitle = styled.h1.attrs({
    className: "fluid-type-5",
})`
    color: var(--color-text-light);
    margin-bottom: 0.5rem;
    position: relative;
    display: inline-block;
`;

const TitleUnderline = styled.div`
    width: 80%;
    height: 4px;
    background: var(--color-accent-mihai);
    margin-bottom: 1.5rem;
`;

const SubtitleContainer = styled.div`
    margin-bottom: 1.5rem;
`;

const SubTitle = styled.h2`
    margin-bottom: 1rem;
    line-height: 1.3;

    .regular {
        display: block;
        color: var(--color-text-light);
        font-weight: 600;
    }

    .highlight {
        display: block;
        color: var(--color-accent-mihai);
        font-weight: 600;
    }
`;

const SubtitleRegular = styled.span.attrs({
    className: "fluid-type-3",
})``;

const SubtitleHighlight = styled.span.attrs({
    className: "fluid-type-3",
})``;

const Description = styled.p.attrs({
    className: "fluid-type-1-5",
})`
    color: var(--color-text-secondary);
    line-height: 1.6;
    margin-bottom: 1rem;
    max-width: 65ch;
    mix-blend-mode: plus-lighter;
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
 * @param {boolean} props.showBackgroundBlur - Whether to show the background blur effect (default: false)
 * @returns {JSX.Element} Header component
 */
export function Header({
                           title,
                           titleAs = 'h3',
                           subtitleRegular = "",
                           subtitleHighlight = "",
                           description = "",
                           showUnderline = true,
                           showBackgroundBlur = false,
                       }) {
    return (
        <HeaderSection as={titleAs}>
            {showBackgroundBlur && <BackgroundBlur/>}

            <TitleWrapper>
                <PageTitle>{title}</PageTitle>
                {showUnderline && <TitleUnderline/>}
            </TitleWrapper>

            {(subtitleRegular || subtitleHighlight) && (
                <SubtitleContainer>
                    <SubTitle>
                        {subtitleRegular && (
                            <SubtitleRegular className="regular">
                                {subtitleRegular}
                            </SubtitleRegular>
                        )}
                        {subtitleHighlight && (
                            <SubtitleHighlight className="highlight">
                                {subtitleHighlight}
                            </SubtitleHighlight>
                        )}
                    </SubTitle>
                </SubtitleContainer>
            )}

            {description && <Description>{description}</Description>}
        </HeaderSection>
    );
}

export {
    HeaderSection,
    BackgroundBlur,
    TitleWrapper,
    PageTitle,
    TitleUnderline,
    SubtitleContainer,
    SubTitle,
    SubtitleRegular,
    SubtitleHighlight,
    Description,
};
