"use client";
import Image from "next/image";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useState } from "react";
import AuditMultiModal from "@/components/pages/homepage/hero/AuditMultiModal";

const HeroSection = () => {
    const t = useTranslations("pages.homepage.sections.hero");
    const [isAuditModalOpen, setIsAuditModalOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col justify-center">
            <div className="container mx-auto px-4 xl:-translate-y-1/3">
                <div className="flex">
                    <div className="w-full md:w-1/2 lg:w-3/5">
                        <h2 className="text-lg ">{t("companyName")}</h2>
                        <h1 className="fluid-type-5">
                            {t("headline.line1")}
                            <br />
                            {t("headline.line2")}
                            <br />
                            {t("headline.line3")}
                        </h1>
                        <p
                            className="text-xl text-gray-200 w-full md:w-1/2 lg:w-3/5"
                            style={{ fontWeight: "200" }}
                        >
                            {t("description")}
                        </p>
                        <button
                            onClick={() => setIsAuditModalOpen(true)}
                            className="flex items-center bg-transparent text-white font-bold no-underline cursor-pointer"
                        >
                            <p className="fluid-type-2">{t("ctaButton")}</p>
                            <Image
                                src="/icons/arrows/maximize 01.svg"
                                alt={t("arrowAlt")}
                                width={30}
                                height={30}
                                className="ml-2 mb-3"
                                style={{ marginBottom: "3rem", marginLeft: "1rem" }}
                            />
                        </button>
                    </div>
                </div>
            </div>
            {isAuditModalOpen && (
                <AuditMultiModal onClose={() => setIsAuditModalOpen(false)} />
            )}
        </div>
    );
};

export default HeroSection;
