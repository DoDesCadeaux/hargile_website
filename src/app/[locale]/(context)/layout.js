"use client"
import AuditMultiModal from "@/components/pages/homepage/hero/AuditMultiModal";
import {useSiteNavigation} from "@/components/providers/site-navigation-provider";
import {AuditButton} from "@/components/AuditButton";

export default function ContextLayout({children}) {
    const navigation = useSiteNavigation()

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
