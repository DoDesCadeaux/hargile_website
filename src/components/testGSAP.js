"use client"

import {useEffect, useRef} from "react";
import gsap from "gsap";

const TestGSAP = () => {
    const boxRef = useRef(null);

    useEffect(() => {
        gsap.to(boxRef.current, {rotation: 360, duration: 1, repeat: -1, yoyo: true});
    }, []);

    return (
        <div className={'flex justify-center mt-20'}>
            <div ref={boxRef} style={{width: 100, height: 100, backgroundColor: "red"}}/>
        </div>);
};

export default TestGSAP;
