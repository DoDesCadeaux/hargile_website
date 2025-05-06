"use client"

import {useSiteNavigation} from "@/components/providers/site-navigation-provider";
import React from "react";
import ClientLayoutContent from "@/components/layout/ClientLayoutContent";
import AuditMultiModal from "@/components/pages/homepage/hero/AuditMultiModal";


export default function ClientLayout({children}) {
    const navigation = useSiteNavigation();

    return (
        <>
            <ClientLayoutContent>
                {navigation.isAuditModalOpen && (
                    <AuditMultiModal onClose={() => navigation.setIsAuditModalOpen(false)}/>
                )}
                {children}
            </ClientLayoutContent>
        </>
    );
}
