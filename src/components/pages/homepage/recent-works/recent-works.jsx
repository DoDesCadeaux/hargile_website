// src/components/pages/homepage/recent-works/recent-works.jsx
"use client";

import {useEffect, useRef, useState} from "react";
import {useTranslations} from "next-intl";
import {motion, useAnimation, useInView} from "framer-motion";
import {SectionContainer, SectionLink, SectionTitle, WorksGrid} from "./recent-works.styled";
import WorkCard from "./work-card";

const RecentWorks = () => {
    const t = useTranslations("pages.homepage.sections.recent-works");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {once: false, amount: 0.2});
    const controls = useAnimation();
    const [scrollY, setScrollY] = useState(0);
    const [windowHeight, setWindowHeight] = useState(0);
    const [documentHeight, setDocumentHeight] = useState(0);

    // Track scroll position for diagonal parallax effect
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleResize = () => {
            setWindowHeight(window.innerHeight);
            setDocumentHeight(document.body.scrollHeight);
        };

        handleResize();
        window.addEventListener("scroll", handleScroll, {passive: true});
        window.addEventListener("resize", handleResize, {passive: true});

        return () => {
            window.removeEventListener("scroll", handleScroll);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Initial offset values to create the \ diagonal (start positions)
    const initialOffsets = {
        "agves": (windowHeight / 100) * -17,  // Top card starts higher (-100px)
        "i-go": (windowHeight / 100) * 40,      // Middle card at neutral position
        "leafy": (windowHeight / 100) * 90    // Bottom card starts lower (+100px)
    };

    // Define how much each card should move to achieve the / diagonal at the end
    const works = [
        {
            id: "agves",
            title: t("works.agves.title") || "AGVES",
            description: t("works.agves.description") || "Platform for schools",
            image: "/images/crayons.jpg",
            link: "/works/agves",
            parallaxFactor: 0.008   // AGVES moves down a lot
        },
        {
            id: "i-go",
            title: t("works.i-go.title") || "I GO",
            description: t("works.i-go.description") || "Mobile development, AI",
            image: "/images/crayons.jpg",
            link: "/works/i-go",
            parallaxFactor: -0.026 // I GO moves down slightly
        },
        {
            id: "leafy",
            title: t("works.leafy.title") || "Leafy",
            description: t("works.leafy.description") || "E-commerce for plants, Full-stack",
            image: "/images/crayons.jpg",
            link: "/works/leafy",
            parallaxFactor: -0.058  // Leafy moves up
        }
    ];

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

    // Calculate vertical offset for diagonal parallax effect
    const getCardStyle = (workId, parallaxFactor) => {
        if (!windowHeight || !documentHeight) return {};

        // Calculate scroll progress as percentage of whole document
        const scrollableHeight = documentHeight - windowHeight;
        const scrollProgress = Math.min(1, scrollY / scrollableHeight);

        // Calculate parallax offset based on scroll progress
        const totalRange = windowHeight * 2;
        const parallaxOffset = (scrollProgress * totalRange) * parallaxFactor * 10;

        // Combine initial offset with scroll-based parallax
        const initialOffset = initialOffsets[workId] || 0;
        const finalOffset = initialOffset + parallaxOffset;

        return {
            transform: `translateY(${finalOffset}px)`
        };
    };

    return (
        <SectionContainer ref={sectionRef}>
            <motion.div
                initial="hidden"
                animate={controls}
                variants={sectionVariants}
            >
                <SectionTitle>
                    {t("title") || "Our recent works"}
                </SectionTitle>

                <WorksGrid>
                    {works.map((work, index) => (
                        <div
                            key={work.id}
                            style={{
                                ...getCardStyle(work.id, work.parallaxFactor),
                                transition: "transform 0.5s ease-out"
                            }}
                            className="work-card-wrapper"
                        >
                            <WorkCard
                                work={work}
                                index={index}
                                inView={isInView}
                            />
                        </div>
                    ))}
                </WorksGrid>

                <SectionLink href="/works">
                    {t("view-all") || "All our works"} →
                </SectionLink>
            </motion.div>
        </SectionContainer>
    );
};

export default RecentWorks;
