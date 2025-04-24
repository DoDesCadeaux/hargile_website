"use client"
import {useEffect, useRef} from "react";
import {CardContainer, CardContent, CardImage, CardTitle, Category, ImageContainer} from "./insight-card.styled";


const InsightCard = ({insight, index, isInView}) => {
    const cardRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        if (isInView && cardRef.current) {
            setTimeout(() => {
                cardRef.current.classList.add("card-visible");
            }, index * 150);
        }
    }, [isInView, index]);

    const handleMouseMove = (e) => {
        if (!imageRef.current) return;

        const {clientX, clientY} = e;
        const {left, top, width, height} = cardRef.current.getBoundingClientRect();

        const xPos = (clientX - left) / width - 0.5;
        const yPos = (clientY - top) / height - 0.5;

        imageRef.current.style.transform = `
            scale(1.1) translate(${xPos * 15}px, ${yPos * 15}px)
        `;
    };

    const handleMouseLeave = () => {
        if (!imageRef.current) return;
        imageRef.current.style.transform = "scale(1)";
    };

    return (
        <CardContainer
            ref={cardRef}
            href={insight.link}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            $opacity={isInView ? 1 : 0}
        >
            <ImageContainer>
                <CardImage
                    style={{maxWidth: '100%', width: '100%', height: 'auto', objectFit: 'cover'}}
                    ref={imageRef}
                    src={insight.image}
                    alt={insight.title}
                    width={600}
                    height={360}
                />
            </ImageContainer>
            <CardContent>
                <Category>{insight.category}</Category>
                <CardTitle>{insight.title}</CardTitle>
            </CardContent>
        </CardContainer>
    );
};

export default InsightCard;
