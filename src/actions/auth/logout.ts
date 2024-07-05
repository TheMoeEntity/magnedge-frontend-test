'use server'
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
// server function to logout and remove session
export const logout = async () => {
    cookies().delete('session')
    redirect('/auth/signin?notAuth=true')
}