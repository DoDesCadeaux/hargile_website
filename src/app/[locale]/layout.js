import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getMessages, setRequestLocale} from 'next-intl/server';
import ClientLayoutContent from '@/components/layout/ClientLayoutContent';
import {AuditButton} from '@/components/AuditButton';
import Loading from "@/components/Loading";
import {Suspense} from "react";

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}) {
    "use client"
    const {locale} = await params;

    setRequestLocale(locale);
    const messages = await getMessages()

    if (!hasLocale(routing.locales, locale)) notFound();


    return (
        <Suspense fallback={<Loading/>}>
            <NextIntlClientProvider
                locale={locale}
                timeZone="Europe/Bruxelles"
                messages={messages}
            >
                <Suspense fallback={<Loading/>}>
                    {locale && <>
                        <ClientLayoutContent>
                            {children}
                        </ClientLayoutContent>
                        <AuditButton/>
                    </>}
                </Suspense>
            </NextIntlClientProvider>
        </Suspense>
    );
}
