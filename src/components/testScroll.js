"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TestScroll() {
    const boxRef = useRef(null);

    useEffect(() => {
        gsap.to(boxRef.current, {
            x: 300,
            opacity: 1,
            duration: 2,
            rotation: 360,
            scrollTrigger: {
                trigger: boxRef.current,
                start: "top 50%",
                end: "top 30%",
                scrub: true,
            },
        });
    }, []);

    return (
        <div style={{ height: "50vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div ref={boxRef} style={{ width: 100, height: 100, backgroundColor: "blue", opacity: 0 }} />
        </div>
    );
}
