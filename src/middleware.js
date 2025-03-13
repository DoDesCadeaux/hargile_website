import {NextResponse} from 'next/server';
import {routing} from '@/i18n/routing';

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(req) {
    if (
        req.nextUrl.pathname.startsWith('/_next') ||
        req.nextUrl.pathname.includes('/api/') ||
        PUBLIC_FILE.test(req.nextUrl.pathname)
    ) {
        return;
    }

    const locale = req.cookies.get('NEXT_LOCALE')?.value || routing.defaultLocale;

    if (req.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL(`/${locale}`, req.url));
    }

    if (req.nextUrl.locale === 'default') {
        return NextResponse.redirect(
            new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
        );
    }
}
