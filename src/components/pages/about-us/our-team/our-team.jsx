// src/components/pages/about-us/our-team/our-team.jsx
"use client";

import {useRef} from "react";
import {useTranslations} from "next-intl";
import {motion, useInView} from "framer-motion";
import TeamMember from "./team-member";
import {SectionContainer, SectionTitle, TeamGrid, TitleWrapper} from "./our-team.styled";

const OurTeam = () => {
    const t = useTranslations("pages.about-us.sections.our-team");
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, {
        once: true,
        amount: 0.2,
        margin: "0px 0px -200px 0px" // Trigger earlier
    });

    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.3 // Increased delay between children
            }
        }
    };

    const titleVariants = {
        hidden: {opacity: 0, y: 20},
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const cardVariants = {
        hidden: {opacity: 0, y: 40, scale: 0.95},
        visible: (i) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                delay: i * 0.2 // Staggered delay based on index
            }
        })
    };

    const teamMembers = [
        {
            id: "charles",
            name: "Charles de Lalaing",
            role: t("members.charles.role"),
            imageSrc: "/images/pages/our-story/our-team/charles.png"
        },
        {
            id: "pascal",
            name: "Pascal Laye",
            role: t("members.pascal.role"),
            imageSrc: "/images/pages/our-story/our-team/charles.png",
        },
        {
            id: "alexis",
            name: "Alexis Van San",
            role: t("members.alexis.role"),
            imageSrc: "/images/pages/our-story/our-team/charles.png",
            width: 800,
            height: 800,
        },
        {
            id: "dorian",
            name: "Dorian Durakou",
            role: t("members.alexis.role"),
            imageSrc: "/images/pages/our-story/our-team/charles.png",
            width: 800,
            height: 800,
        },
        {
            id: "mihai",
            name: "Mihai Patap",
            role: t("members.alexis.role"),
            imageSrc: "/images/pages/our-story/our-team/charles.png",
            width: 800,
            height: 800,
        }
    ];

    return (
        <SectionContainer ref={sectionRef}>
            <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={containerVariants}
            >
                <TitleWrapper variants={titleVariants} as={motion.div}>
                    <SectionTitle>{t("title")}</SectionTitle>
                </TitleWrapper>

                <TeamGrid>
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={member.id}
                            variants={cardVariants}
                            custom={index}
                        >
                            <TeamMember
                                name={member.name}
                                role={member.role}
                                imageSrc={member.imageSrc}
                                width={member.width}
                                height={member.height}
                            />
                        </motion.div>
                    ))}
                </TeamGrid>
            </motion.div>
        </SectionContainer>
    );
};

export default OurTeam;
