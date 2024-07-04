'use server'

import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { tableType } from "@/app/users/page";
export interface JwtPayload {
    userid: string;
    role: string;
    data: {
        firstName: string;
        lastName: string;
    };
    createdAt: number;
}
interface IResponse {
    data: tableType[],
    responseMessage: string,
    responseCode: number
}
export const getAllUsers = async () => {
    const session_token = cookies().get('token')?.value || ""
    const endpoint = process.env.NEXT_PUBLIC_GET_ALL_USERS
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