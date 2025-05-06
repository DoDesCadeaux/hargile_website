// src/app/[locale]/shared-metadata.js

export function generateSharedMetadata(params, translations) {
    const {locale} = params;
    const isDefault = locale === 'fr'; // French is the default

    // Base URL with locale
    const baseUrl = `https://hargile-website.vercel.app/${locale}`;

    // Default image path (absolute URL required for OG/Twitter)
    const imageUrl = `https://hargile-website.vercel.app/images/brand/brand_large.png`;

    return {
        metadataBase: new URL('https://hargile-website.vercel.app'),
        title: {
            template: isDefault
                ? '%s | HARGILE - Innovation digitale'
                : '%s | HARGILE - Digital Innovation',
            default: isDefault
                ? 'HARGILE - Innovation digitale au service de votre entreprise'
                : 'HARGILE - Digital Innovation for Your Business',
        },
        description: isDefault
            ? 'Agence digitale spécialisée dans le développement web, les solutions IA et les stratégies marketing'
            : 'Digital agency specializing in web development, AI solutions, and marketing strategies',
        applicationName: 'HARGILE',
        // Alternative languages
        alternates: {
            canonical: baseUrl,
            languages: {
                'fr': 'https://hargile-website.vercel.app/fr',
                'en': 'https://hargile-website.vercel.app/en',
            },
        },
        // OpenGraph metadata
        openGraph: {
            type: 'website',
            locale: locale,
            url: baseUrl,
            siteName: 'HARGILE',
            title: isDefault
                ? 'HARGILE - Innovation digitale au service de votre entreprise'
                : 'HARGILE - Digital Innovation for Your Business',
            description: isDefault
                ? 'Agence digitale spécialisée dans le développement web, les solutions IA et les stratégies marketing'
                : 'Digital agency specializing in web development, AI solutions, and marketing strategies',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: 'HARGILE',
                },
            ],
        },
        // Twitter card metadata
        twitter: {
            card: 'summary_large_image',
            title: isDefault
                ? 'HARGILE - Innovation digitale au service de votre entreprise'
                : 'HARGILE - Digital Innovation for Your Business',
            description: isDefault
                ? 'Agence digitale spécialisée dans le développement web, les solutions IA et les stratégies marketing'
                : 'Digital agency specializing in web development, AI solutions, and marketing strategies',
            images: [imageUrl],
            creator: '@hargile_agency',
            site: '@hargile_agency',
        },
        robots: {
            index: true,
            follow: true,
            nocache: false,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        icons: {
            icon: '/favicon.ico',
            apple: '/apple-icon.png',
        },
    };
}
