"use client";

import AuditMultiModal from "@/components/pages/homepage/hero/AuditMultiModal";
import {useSiteNavigation} from "@/components/providers/site-navigation-provider";
import {usePageTransition} from "@/components/TransitionLink";
import {useEffect} from "react";
import SmoothScroll, {lockScroll, unlockScroll} from "@/components/smooth-scroll";

export default function ContextLayout({children}) {
    const navigation = useSiteNavigation();
    const {isTransitioning} = usePageTransition();

    // Handle menu opening/closing
    useEffect(() => {
        console.log(`[ContextLayout] Menu/modal state change: isOpen=${navigation.isOpen}, isAuditModalOpen=${navigation.isAuditModalOpen}`);

        // Lock/unlock scrolling based on menu/modal state
        if (navigation.isOpen || navigation.isAuditModalOpen || isTransitioning) {
            lockScroll();
        } else {
            unlockScroll();
        }
    }, [navigation.isOpen, navigation.isAuditModalOpen, isTransitioning]);

    return (
        <SmoothScroll>
            {navigation.isAuditModalOpen && (
                <AuditMultiModal onClose={() => navigation.setIsAuditModalOpen(false)}/>
            )}
            {children}
        </SmoothScroll>
    );
}
