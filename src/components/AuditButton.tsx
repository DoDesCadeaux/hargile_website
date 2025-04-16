import {useTranslations} from "next-intl";
import React from "react";
import styled from "styled-components";

const AuditButtonStyled = styled.button.attrs({
    className: 'fluid-type-0-5'
})`
    cursor: pointer;
    background: rgba(0,0,0,0.8);
    backdrop-filter: blur(2px);
    position: fixed;
    bottom: 24px;
    right: 24px;
    height: max-content;
    padding: 0 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 15px;
    border: 1px solid var(--color-accent-blue-planet);

    .text-side {
        color: var(--color-accent-blue-planet);
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
    }

    .image-side {
        width: 75px;
        height: 75px;
    }
`

export const AuditButton = () => {
    const t = useTranslations('audit-button');

    return (
        <AuditButtonStyled onClick={() => alert("Ouverture de l'overlay")}>
            <div className="text-side">
                <span style={{fontWeight: 550}}>{t('title')}</span>
                <span>{t('description')}</span>
            </div>

            <div className={'fluid-type-3 image-side'} style={{
                width: '75px',
                height: '75px',
                borderRadius: '99999px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>😉
            </div>
        </AuditButtonStyled>
    )
}
