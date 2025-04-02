"use client";

import Earth from '@/components/Earth';
import Services from "@/components/pages/services/services";
import {Header} from "@/components/header/mainHeader";
import {useTranslations} from "next-intl";
import ServicesHeader from "@/components/pages/services/service-header";

export default function ServicesPage() {
    const t = useTranslations("pages.services");

    return (
        <Earth>
            <Header
                description={t("description")}
                title={t("mainTitle")}
                subtitleHighlight={t("subtitleBold")}
                subtitleRegular={t("subtitleItalic")}
                showUnderline
                showBackgroundBlur
            />
            <ServicesHeader/>
            <Services/>
        </Earth>
    );
}
