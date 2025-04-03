import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {setRequestLocale} from "next-intl/server";
import Footer from "@/components/footer/Footer";
import EarthVideoLayer from "@/components/EarthVideoLayer";
import OptimizedSvgFilter from "@/components/navigation/opitmized-svg-filter";
import Navbar from "@/components/navigation/navbar";


export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}) {
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale)

    return (
        <NextIntlClientProvider>
            <EarthVideoLayer/>
            <OptimizedSvgFilter/>
            <Navbar/>
            <div className={'content-container'}>
                {children}
            </div>

            <Footer/>
        </NextIntlClientProvider>
    );
}
