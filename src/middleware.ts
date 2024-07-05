import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { isAdmin } from './actions/auth/isAdmin';

const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);

export interface JwtPayload {
    userid: string;
    role: string;
    data: {
        firstName: string;
        lastName: string;
    };
    createdAt: number;
}

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('session')?.value;

    // Check if the user is trying to access the login or signup page
    const loginOrSignup = req.nextUrl.pathname.startsWith('/auth/signin') || req.nextUrl.pathname.startsWith('/auth/signup');
    const isExpiredParam = req.nextUrl.searchParams.get('isExpired');

    if (!token) {
        if (!loginOrSignup) {
            const redirectUrl = req.nextUrl.clone();
            redirectUrl.pathname = '/auth/signin';
            redirectUrl.searchParams.set('notAuth', "true");
            return NextResponse.redirect(redirectUrl);
        }
        return NextResponse.next();
    }

    try {
        const { payload } = await jwtVerify(token, secret) as { payload: JwtPayload };

        // Check if the session is expired
        const sessionExpiryTime = 60 * 60 * 1000 * 24; // 24 hours in milliseconds
        const isExpired = Date.now() - payload.createdAt > sessionExpiryTime;

        if (isExpired && !isExpiredParam) {
            const redirectUrl = req.nextUrl.clone();
            redirectUrl.pathname = req.nextUrl.pathname;
            redirectUrl.searchParams.set('isExpired', "true");
            redirectUrl.searchParams.set('redirect', req.nextUrl.pathname);
            return NextResponse.redirect(redirectUrl);
        }

        if (loginOrSignup && !isExpiredParam) {
            const redirectUrl = req.nextUrl.clone();
            redirectUrl.pathname = '/';
            return NextResponse.redirect(redirectUrl);
        }
        if (req.nextUrl.pathname.startsWith('/users')) {
            const isAdminUser = await isAdmin();
            if (!isAdminUser) {
                const redirectUrl = req.nextUrl.clone();
                redirectUrl.pathname = '/403';
                return NextResponse.redirect(redirectUrl);
            }
        }

        return NextResponse.next();
    } catch (err) {
        console.error('JWT Verification Error:', err);
        const redirectUrl = req.nextUrl.clone();
        redirectUrl.pathname = '/auth/signin';
        redirectUrl.searchParams.set('notAuth', "true");
        return NextResponse.redirect(redirectUrl);
    }
}

export const config = {
    matcher: ['/', '/auth/signin', '/users'],
};
