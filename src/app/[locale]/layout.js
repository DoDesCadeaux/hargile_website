import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {getMessages, setRequestLocale} from 'next-intl/server';
import ClientLayoutContent from '@/components/layout/ClientLayoutContent';
import {AuditButton} from '@/components/AuditButton';

export function generateStaticParams() {
    return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({children, params}) {
    const {locale} = await params;

    setRequestLocale(locale);
    const messages = await getMessages()

    if (!hasLocale(routing.locales, locale)) notFound();

    return (
        <NextIntlClientProvider
            locale={locale}
            timeZone="Europe/Bruxelles"
            messages={messages}
        >
            <ClientLayoutContent>
                {children}
            </ClientLayoutContent>
            <AuditButton/>
        </NextIntlClientProvider>
    );
}
