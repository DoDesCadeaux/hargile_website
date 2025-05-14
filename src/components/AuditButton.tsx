"use client"
import {useTranslations} from "next-intl";
import React from "react";
import styled from "styled-components";
import {Radar} from "lucide-react";
import {useSiteNavigation} from "@/components/providers/site-navigation-provider"

const AuditButtonStyled = styled.button.attrs({
    className: 'fluid-type-0-5'
})`
    cursor: pointer;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(6px);
    position: fixed;
    bottom: 24px;
    right: 24px;
    height: max-content;
    padding: 12px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 6px;
    border: 1px solid var(--color-accent-blue-planet);
    gap: 1rem;
    z-index: 100;

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
    const navigation = useSiteNavigation()
    const t = useTranslations('components.audit-button');

    if (navigation.isOpen) return null;

    return (
        <AuditButtonStyled onClick={() => navigation.setIsAuditModalOpen(true)} aria-label={'Open audit dialog'}>
            <div className="text-side">
                <span style={{fontWeight: 550}}>{t('title')}</span>
                <span>{t('description')}</span>
            </div>

            <Radar width={35} height={35} color={'var(--color-accent-blue-planet)'} strokeWidth={1.4}/>
        </AuditButtonStyled>
    )
}
