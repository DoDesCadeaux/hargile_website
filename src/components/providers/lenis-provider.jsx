"use client";

import React, {useRef} from "react";
import {ReactLenis} from "lenis/react";

const LenisProvider = ({children}) => {
    const lenisRef = useRef(null);

    return <ReactLenis root ref={lenisRef} options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
        smooth: true,
        wheelMultiplier: 1,
        gestureOrientation: 'vertical',
        normalizeWheel: true,
    }}>
        {children}
    </ReactLenis>;
};

export default LenisProvider;
