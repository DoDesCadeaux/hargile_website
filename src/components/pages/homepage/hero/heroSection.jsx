"use client";
import Image from "next/image";
import {useTranslations} from "next-intl";
import {ReadMore} from "@/components/ReadMore";
import {useSiteNavigation} from "@/components/providers/site-navigation-provider";

const HeroSection = () => {
    const t = useTranslations("pages.homepage.sections.hero");
    const navigation = useSiteNavigation()
    let isMobile = true

    try {
        isMobile = window.innerWidth <= 1024
    } catch (e) {
        isMobile = true
    }


    return (
        <div className="min-h-screen flex flex-col justify-center">
            <div className="container mx-auto px-4">
                <div className="flex">
                    <div className="w-full md:w-4/6 lg:w-4/5">
                        <h1 className={!isMobile ? 'fluid-type-4' : 'fluid-type-3'}>
                            {t("headline.line1") + ' '}
                            <br/>
                            {t("headline.line2")}
                            <br/>
                            {t("headline.line3")}
                        </h1>
                        <p
                            className="mb-8  w-full lg:w-3/5 fluid-type-1"
                            style={{fontWeight: "200"}}
                        >
                            {t("description")}
                        </p>
                        <button
                            onClick={() => navigation.setIsAuditModalOpen(true)}
                            className="flex items-center bg-transparent text-white font-bold no-underline cursor-pointer"
                        >
                            <p className="fluid-type-2">{t("ctaButton")}</p>
                            <Image
                                src="/icons/arrows/maximize 01.svg"
                                alt={t("arrowAlt")}
                                width={30}
                                height={30}
                                className="ml-2 mb-3"
                                style={{marginBottom: "3rem", marginLeft: "1rem"}}
                            />
                        </button>

                        <ReadMore
                            id={'home-hero-paragraph'}
                            text={t('paragraph')}
                            amountOfWords={16}
                            classNames={"fluid-type-1"}
                            style={{maxWidth: '65ch'}}
                        />

                    </div>
                </div>
            </div>
            <blockquote style={{
                paddingLeft: 0,
                textShadow: '0 0 8px black',
                mixBlendMode: "plus-lighter",
                color: 'var(--color-accent-blue-planet)',
            }} className={'w-full text-center fluid-type-2 italic'}>{t('quote')}</blockquote>
        </div>
    );
};

export default HeroSection;
