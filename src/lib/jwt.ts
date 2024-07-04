import { SignJWT } from 'jose';

export async function signJWT(payload:any) {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('1d')
        .sign(secret);
}