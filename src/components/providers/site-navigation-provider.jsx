"use client";

import {createContext, useContext, useState} from "react";

const SiteNavigationContext = createContext(null);

export const SiteNavigationProvider = ({children}) => {
    const [currentSection, setCurrentSection] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

    const toggleAuditModal = () => setIsAuditModalOpen(!isAuditModalOpen);

    const toggleMenu = () => setIsOpen((prev) => !prev);

    return (
        <SiteNavigationContext.Provider
            value={{
                currentSection,
                setCurrentSection,
                isOpen,
                toggleMenu,
                isAuditModalOpen,
                setIsAuditModalOpen,
                toggleAuditModal
            }}>
            {children}
        </SiteNavigationContext.Provider>
    );
};

export const useSiteNavigation = () => {
    const context = useContext(SiteNavigationContext);
    if (!context) {
        throw new Error("useSiteNavigation must be used within a SiteNavigationProvider");
    }
    return context;
};
