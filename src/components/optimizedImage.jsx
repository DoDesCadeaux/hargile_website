// src/components/OptimizedImage.jsx
"use client";

import Image from "next/image";

export const OptimizedImage = ({style, src, alt, width = 1200, height = 800}) => {
    return (
        <Image
            style={style}
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="rounded-lg shadow-md"
        />
    );
};
