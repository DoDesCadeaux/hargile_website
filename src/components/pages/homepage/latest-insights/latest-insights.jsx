"use client";

import {useEffect, useRef, useState} from "react";
import {useTranslations} from "next-intl";
import {motion, useAnimation, useInView} from "framer-motion";
import {ArrowRight} from "lucide-react";
import {
    ContentWrapper,
    InsightsGrid,
    SectionContainer,
    SectionHeader,
    SectionSubtitle,
    SectionTitle,
    ViewAllLink
} from "./latest-insights.styled";
import InsightCard from "./insight-card";

const LatestInsights = () => {
    const t = useTranslations("pages.homepage.sections.latest-insights");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {once: false, amount: 0.2});
    const controls = useAnimation();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll, {passive: true});

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (isInView) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isInView, controls]);

    const sectionVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                duration: 0.5,
                staggerChildren: 0.2
            }
        }
    };

    const headerVariants = {
        hidden: {opacity: 0, y: 50},
        visible: {
            opacity: 1,
            y: 0,
            transition: {duration: 0.6, ease: "easeOut", delayTime: 1.6}
        }
    };

    const getParallaxStyle = () => {
        const yOffset = scrollY * 0.1;
        return {
            transform: `translateY(-${yOffset}px)`
        };
    };

    const insights = [
        {
            id: "b2b-websites",
            category: "WEB & DIGITAL DESIGN",
            title: "How the Next Gen of B2B Websites are Accelerating Business Growth",
            image: "/images/crayons.jpg",
            link: "/insights/b2b-websites"
        },
        {
            id: "ai-customer-experience",
            category: "ARTIFICIAL INTELLIGENCE",
            title: "How AI is Transforming Customer Experience in 2025",
            image: "/images/crayons.jpg",
            link: "/insights/ai-customer-experience"
        },
        {
            id: "sustainability",
            category: "SUSTAINABILITY",
            title: "Digital Solutions for a Sustainable Future",
            image: "/images/crayons.jpg",
            link: "/insights/digital-sustainability"
        }
    ];

    return (
        <SectionContainer ref={sectionRef} style={getParallaxStyle()}>
            <ContentWrapper
                as={motion.div}
                initial="hidden"
                animate={controls}
                variants={sectionVariants}
            >
                <SectionHeader as={motion.div} variants={headerVariants}>
                    <SectionTitle>{t("title") || "Latest insights"}</SectionTitle>
                    <SectionSubtitle>
                        {t("subtitle") || "Our thoughts and perspectives on the digital world"}
                    </SectionSubtitle>
                </SectionHeader>

                <InsightsGrid>
                    {insights.map((insight, index) => (
                        <InsightCard
                            key={insight.id}
                            insight={insight}
                            index={index}
                        />
                    ))}
                </InsightsGrid>

                <ViewAllLink as={motion.a} variants={headerVariants} href="/insights">
                    {t("view-all") || "View all insights"} <ArrowRight size={20}/>
                </ViewAllLink>
            </ContentWrapper>
        </SectionContainer>
    );
};

export default LatestInsights
