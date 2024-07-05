'use server'

import { signJWT } from "@/lib/jwt";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { ISession } from "../auth/login";
import { jwtVerify } from "jose";
/// Server function to fetch account details
export interface JwtPayload {
    userid: string;
    role: "ADMIN" | "USER";
    data: {
        firstName: string;
        lastName: string;
    };
    createdAt: number;
}
//API Response
interface IResponse {
    data: {
        _id: string,
        userId: string,
        balance: number,
        createdAt: string,
        updatedAt: string,
        __v: 0
    },
    responseMessage: string,
    responseCode: number
}
export const getAccountDetails = async () => {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET);
    const session = cookies().get('session')?.value || ""
    const session_token = cookies().get('token')?.value || ""
    const { payload } = await jwtVerify(session, secret) as { payload: JwtPayload };
    const userid = payload.userid
    const endpoint = process.env.NEXT_PUBLIC_ACCOUNT_DETAILS + userid
    try {
        const response = await axios.get(endpoint || "", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session_token}`
            },
        });

        const apiResponse = response.data as IResponse

        if ((response.status === 200 || response.status === 201) && ((apiResponse.responseCode === 201 || apiResponse.responseCode === 200) && apiResponse.data !== null)) {
            //return data to frontend and handle error and success states 
            return { status: 'success', message: apiResponse.responseMessage, data: apiResponse.data, statusCode: apiResponse.responseCode }
        } else {
            return { status: 'error', message: apiResponse.responseMessage, data: null, statusCode: apiResponse.responseCode }
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
        return { status: 'error', data: null, message: errorMessage, statusCode }

    }
}