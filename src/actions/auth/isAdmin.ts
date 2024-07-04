'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ISession } from "./login"
import { JwtPayload } from "../fetch/getAccountDetails"
import { jwtVerify } from "jose"


export const isAdmin = async () => {
    const token = cookies().get('session')?.value
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    if (!token) {
        redirect('/auth/signin')
    }
    const { payload } = await jwtVerify(token, secret) as { payload: JwtPayload };
    const role = payload.role

    return role === 'ADMIN' ? true : false
}