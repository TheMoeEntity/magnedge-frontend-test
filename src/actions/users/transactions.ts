'use server'

import { signJWT } from "@/lib/jwt";
import axios, { AxiosError } from "axios";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { JwtPayload } from "../fetch/getAccountDetails";
import { revalidatePath } from "next/cache";

interface ILogin {
    transactionName: string,
    transactionStatus: string,
    transactionDate: string,
    receiverName: string,
    bankName: string,
    transactionAmount: number | string,
    transactionType: string,
}
export interface ISession {
    createdAt: string
    role: "ADMIN" | "USER"
    data: {
        firstName: string
        lastnName: string
    }
    userid: string
}
interface IResponse {
    data: {
        userInfo: {
            _id: string,
            firstname: string,
            lastname: string,
            email: string,
            role: "ADMIN" | "USER"
        },
        token: string
    },
    responseMessage: string,
    responseCode: number

}
export const transactions = async (formData: ILogin) => {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const session = cookies().get('session')?.value || ""
    const session_token = cookies().get('token')?.value || ""
    const { payload } = await jwtVerify(session, secret) as { payload: JwtPayload };
    const userid = payload.userid
    const endpoint = "https://accountmanagement.onrender.com/api/transaction/createtransaction"
    console.log(endpoint)
    try {
        const response = await axios.put(endpoint || '', { userId: userid, ...formData }, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session_token}`
            },
        });

        const apiResponse = response.data as IResponse
        console.log(apiResponse)

        if ((response.status === 200 || response.status === 201) && ((apiResponse.responseCode === 201 || apiResponse.responseCode === 200) && apiResponse.data !== null)) {
            revalidatePath('/', 'layout')
            return { status: 'success', message: apiResponse.responseMessage, data: apiResponse.data, statusCode: apiResponse.responseCode }
        } else {
            return { status: 'error', message: apiResponse.responseMessage, statusCode: apiResponse.responseCode }
        }

    } catch (err) {
        let errorMessage = 'An error occurred';
        let statusCode = 400
        if (axios.isAxiosError(err)) {
            const axiosError = err as AxiosError<{ message: string }>;
            errorMessage = axiosError.response?.data.message || axiosError.message;
            statusCode = axiosError.response?.status || 400;

        } else if (err instanceof Error) {
            errorMessage = err.message;
        }
        return { status: 'error', message: errorMessage, statusCode }

    }
}