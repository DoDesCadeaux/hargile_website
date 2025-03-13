"use client";

import {OptimizedImage} from "@/components/optimizedImage";

export const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-brand">
                <OptimizedImage
                    src="/images/brand/brand_large.png"
                    alt="Logo de la marque"
                />
            </div>
        </div>
    )
}
