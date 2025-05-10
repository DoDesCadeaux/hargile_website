import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getMessages, setRequestLocale} from 'next-intl/server';
import {generateSharedMetadata} from './shared-metadata';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({params}) {
    return generateSharedMetadata(await params);
}

export default async function LocaleLayout({children, params}) {
    const {locale} = await params;

    setRequestLocale(locale);

    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    const messages = await getMessages();

    const jsonLdData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "HARGILE",
        "url": `https://hargile-website.vercel.app/${locale}`,
        "logo": "https://hargile-website.vercel.app/images/brand/brand_large.png",
        "description": locale === 'fr'
            ? "Agence digitale spécialisée dans le développement web, les solutions IA et les stratégies marketing"
            : "Digital agency specializing in web development, AI solutions, and marketing strategies"
    };

    return (

        <html lang={locale || null}>
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <meta name="theme-color" content="#000000"/>
            <link rel="icon" href="/favicon.ico"/>
            <link rel="apple-touch-icon" href="/logo192.png"/>
            <meta name="robots" content="index, follow"/>
            <link rel="alternate" hrefLang="x-default" href="https://hargile-website.vercel.app/fr"/>
            <link rel="alternate" hrefLang="fr" href="https://hargile-website.vercel.app/fr"/>
            <link rel="alternate" hrefLang="en" href="https://hargile-website.vercel.app/en"/>

            {/*<Script*/}
            {/*    id="schema-org-data"*/}
            {/*    type="application/ld+json"*/}
            {/*    dangerouslySetInnerHTML={{*/}
            {/*        __html: JSON.stringify(jsonLdData)*/}
            {/*    }}*/}
            {/*    strategy="beforeInteractive"*/}
            {/*/>*/}
        </head>
        <body style={{overflowX: 'hidden', minHeight: '100vh'}}>
        <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
