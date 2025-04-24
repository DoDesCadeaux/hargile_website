import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {setRequestLocale} from "next-intl/server";
import ClientLayoutContent from "@/components/layout/ClientLayoutContent";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}) {
    const {locale} = await params;
    if (!hasLocale(routing.locales, locale)) {
        notFound();
    }

    setRequestLocale(locale);

    return (
        <NextIntlClientProvider>
            <ClientLayoutContent>
                {children}
            </ClientLayoutContent>
        </NextIntlClientProvider>
    );
}
