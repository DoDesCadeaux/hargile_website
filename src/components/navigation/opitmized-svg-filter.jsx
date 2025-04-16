"use client"

import React, {memo} from "react";

export const OptimizedSvgFilter = () => (
    <svg width="0" height="0" style={{position: 'absolute', transform: 'translateZ(0)', backfaceVisibility: 'hidden', willChange: 'transform'}}
         shapeRendering={'geometricPrecision'}>
        <defs>
            <filter id="globalGlowEffect" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceAlpha" stdDeviation="2" result="blur"/>
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="rgba(255, 255, 255, 1)"/>
            </filter>
            <filter id="menuIconGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="rgba(255, 255, 255, 0.6)"/>
            </filter>
        </defs>
    </svg>
);

export default memo(OptimizedSvgFilter);
