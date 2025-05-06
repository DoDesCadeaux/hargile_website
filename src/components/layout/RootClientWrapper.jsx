"use client"

import {PageTransitionProvider} from "@/components/TransitionLink";
import {SiteNavigationProvider} from "@/components/providers/site-navigation-provider";

export default function RootClientWrapper({children}) {
    return (
        <PageTransitionProvider>
            <SiteNavigationProvider>
                {children}
            </SiteNavigationProvider>
        </PageTransitionProvider>
    );
}
