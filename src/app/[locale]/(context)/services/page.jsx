"use client";

import Services from "@/components/pages/services/services";
import {useTranslations} from "next-intl";
import ServicesHeader from "@/components/pages/services/service-header";

export default function ServicesPage() {
    const t = useTranslations("pages.services");

    return (
        <>
            <ServicesHeader/>
            <Services/>
        </>
    );
}
