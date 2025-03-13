import withPlaiceholder from "@plaiceholder/next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        formats: ['image/avif', 'image/webp'],
        deviceSizes: [320, 420, 450, 550, 768, 1024, 1200, 1920, 2560, 3840],
        imageSizes: [16, 32, 48, 64, 96],
    },
};

// Combiner les deux plugins
export default withPlaiceholder(withNextIntl(nextConfig));
