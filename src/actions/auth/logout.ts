'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const logout = async () => {
    cookies().delete('session')
    redirect('/auth/signin')
}