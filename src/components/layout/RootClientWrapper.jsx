"use client";

import {ThemeProvider} from "@/components/providers/theme-provider";
import {PageTransitionProvider} from "@/components/TransitionLink";
import {SiteNavigationProvider} from "@/components/providers/site-navigation-provider";

export default function RootClientWrapper({children}) {
    return (
        <ThemeProvider>
            <PageTransitionProvider>
                <SiteNavigationProvider>
                    {children}
                </SiteNavigationProvider>
            </PageTransitionProvider>
        </ThemeProvider>
    );
}
