import {getTranslations} from 'next-intl/server';

export async function generatePageMetadata({params, pagePath}) {
    const {locale} = await params;

    try {
        const globalT = await getTranslations({
            locale,
            namespace: 'seo.global'
        });

        const pageT = await getTranslations({
            locale,
            namespace: `seo.pages.${pagePath}`
        });

        const domain = globalT('domain');
        const baseUrl = `https://${domain}/${locale}${pagePath === 'home' ? '' : `/${pagePath}`}`;
        const imageUrl = `https://${domain}/images/brand/brand_large.png`;

        return {
            metadataBase: new URL(`https://${domain}`),
            title: pageT('title'),
            description: pageT('description'),
            applicationName: globalT('siteName'),

            alternates: {
                canonical: baseUrl,
                languages: {
                    'fr': `https://${domain}/fr${pagePath === 'home' ? '' : `/${pagePath}`}`,
                    'en': `https://${domain}/en${pagePath === 'home' ? '' : `/${pagePath}`}`,
                },
            },

            openGraph: {
                type: 'website',
                locale: locale,
                url: baseUrl,
                siteName: globalT('siteName'),
                title: pageT('og.title'),
                description: pageT('og.description'),
                images: [
                    {
                        url: imageUrl,
                        width: 1200,
                        height: 630,
                        alt: pageT('og.imageAlt'),
                    },
                ],
            },

            twitter: {
                card: 'summary_large_image',
                title: pageT('og.title'),
                description: pageT('og.description'),
                images: [imageUrl],
                creator: globalT('twitterHandle'),
                site: globalT('twitterHandle'),
            },

            robots: {
                index: true,
                follow: true,
                googleBot: {
                    index: true,
                    follow: true,
                    'max-image-preview': 'large',
                    'max-snippet': -1,
                },
            },

            other: {
                'script:ld+json': {
                    '@context': 'https://schema.org',
                    '@type': pageT('schemaType') || 'WebSite',
                    name: pageT('title'),
                    description: pageT('description'),
                    url: baseUrl,
                    image: imageUrl,
                    publisher: {
                        '@type': 'Organization',
                        name: globalT('siteName'),
                        logo: {
                            '@type': 'ImageObject',
                            url: `https://${domain}/images/brand/brand_large.png`
                        }
                    }
                },
            }
        };
    } catch (error) {
        console.error('Error generating metadata:', error);
        return {
            title: 'HARGILE',
            description: locale === 'fr'
                ? 'Agence digitale spécialisée dans le développement web, les solutions IA et les stratégies marketing'
                : 'Digital agency specializing in web development, AI solutions, and marketing strategies'
        };
    }
}
