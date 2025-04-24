import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {setRequestLocale} from 'next-intl/server';
import ClientLayoutContent from '@/components/layout/ClientLayoutContent';
import {AuditButton} from '@/components/AuditButton';
import Loading from "@/components/Loading";
import {Suspense} from "react";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}) {
    "use client"
    const {locale} = params;

    if (!hasLocale(routing.locales, locale)) notFound();

    setRequestLocale(locale);

    return (
        <Suspense fallback={<Loading/>}>
            <NextIntlClientProvider>
                <ClientLayoutContent>
                    {children}
                </ClientLayoutContent>
                <AuditButton/>

            </NextIntlClientProvider>
        </Suspense>
    );
}
