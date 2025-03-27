// src/components/pages/homepage/latest-insights/insight-card.jsx
import {useEffect, useRef} from "react";
import {useIntersectionObserver} from "@/hooks/useIntersectionObserver";
import {ArrowRight} from "lucide-react";
import {
    CardContainer,
    CardContent,
    CardImage,
    CardTitle,
    Category,
    ImageContainer,
    ReadMore
} from "./insight-card.styled";

const InsightCard = ({insight, index}) => {
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const isInView = useIntersectionObserver(cardRef, {
        threshold: 0.2,
        triggerOnce: true
    });

    useEffect(() => {
        if (isInView && cardRef.current) {
            setTimeout(() => {
                cardRef.current.classList.add("visible");
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
            className="insight-card"
        >
            <ImageContainer>
                <CardImage
                    style={{maxWidth: '100%', height: 'auto', objectFit: 'cover'}}
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
                <ReadMore>
                    Read more <ArrowRight size={16}/>
                </ReadMore>
            </CardContent>
        </CardContainer>
    );
};

export default InsightCard;
