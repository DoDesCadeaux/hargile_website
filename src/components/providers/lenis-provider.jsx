"use client";

import React, {useRef} from "react";
import {ReactLenis} from "lenis/react";

const LenisProvider = ({children}) => {
    const lenisRef = useRef(null);

    return <ReactLenis root ref={lenisRef} options={{lerp: 0.1, duration: 1.5, smoothWheel: true}}>
        {children}
    </ReactLenis>;
};

export default LenisProvider;
