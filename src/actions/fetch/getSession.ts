'use server'

import { JwtPayload } from "@/middleware";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export const getSessionData = async () => {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const session = cookies().get('session')?.value || ""
    const { payload } = await jwtVerify(session, secret) as { payload: JwtPayload };
    const fullName = `${payload.data.firstName} ${payload.data.lastName}`
    return fullName
}