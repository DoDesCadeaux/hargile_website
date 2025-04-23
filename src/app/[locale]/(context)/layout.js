"use client"
import AuditMultiModal from "@/components/pages/homepage/hero/AuditMultiModal";
import {useSiteNavigation} from "@/components/providers/site-navigation-provider";
import {AuditButton} from "@/components/AuditButton";
import {usePageTransition} from "@/components/TransitionLink";
import {useEffect, useRef} from "react";
import Lenis from "lenis";

export default function ContextLayout({children}) {
    const navigation = useSiteNavigation()
    const {isTransitioning} = usePageTransition();
    const lenisRef = useRef(null);

    useEffect(() => {
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenisRef.current.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisRef.current.destroy();
        };
    }, []);

    useEffect(() => {
        if (!lenisRef.current) return;

        if (isTransitioning) {
            lenisRef.current.stop();
        } else {
            lenisRef.current.start();
        }
    }, [isTransitioning]);

    return (
        <>
            {navigation.isAuditModalOpen && (
                <AuditMultiModal onClose={() => navigation.setIsAuditModalOpen(false)}/>
            )}
            <AuditButton/>
            {children}
        </>
    );
}
