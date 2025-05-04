import React from 'react';
import PropTypes from 'prop-types';
import {ButtonContainer, Planet1, Planet2, Planet3, Planet4, StyledLink} from "./DiscoverButton.styled";
import {useTranslations} from "next-intl";

const DiscoverButton = ({href}) => {
    const t = useTranslations('pages.homepage.sections.services')
    const text = t('discover-link')

    return (
        <ButtonContainer style={{scale: 1.25}}>
            <Planet1/>
            <Planet2/>
            <Planet3/>
            <Planet4/>
            <StyledLink href={href} dangerouslySetInnerHTML={{__html: text}}>
            </StyledLink>
        </ButtonContainer>
    );
};

DiscoverButton.propTypes = {
    href: PropTypes.string,
};

export default DiscoverButton;
