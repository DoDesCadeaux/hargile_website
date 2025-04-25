import {PageTransitionProvider} from "@/components/TransitionLink";
import {SiteNavigationProvider} from "@/components/providers/site-navigation-provider";
import {Suspense} from "react";
import Loading from "@/components/Loading/Loading";

export default function RootClientWrapper({children}) {
    return (
        <Suspense fallback={<Loading/>}>
            <PageTransitionProvider>
                <SiteNavigationProvider>
                    {children}
                </SiteNavigationProvider>
            </PageTransitionProvider>
        </Suspense>
    );
}
