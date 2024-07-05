'use server'

import { signJWT } from "@/lib/jwt";
import axios, { AxiosError } from "axios";
import { cookies } from "next/headers";
// server function to signn a user in
interface ILogin {
    customerId: string
    password: string
}
export interface ISession {
    createdAt: string
    role: "ADMIN" | "USER"
    data: {
        firstName: string
        lastnName: string
    }
    userid:string
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
export const loginUser = async (formData: ILogin) => {
    const endpoint = process.env.NEXT_PUBLIC_LOGIN_ENDPOINT
    console.log(endpoint)
    try {
        const response = await axios.post(endpoint || '', formData, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        const apiResponse = response.data as IResponse
        console.log(apiResponse)

        if ((response.status === 200 || response.status === 201) && ((apiResponse.responseCode === 201 || apiResponse.responseCode === 200) && apiResponse.data !== null)) {
            const payload = {
                userid: apiResponse.data.userInfo._id,
                role: apiResponse.data.userInfo.role,
                data: {
                    firstName: apiResponse.data.userInfo.firstname,
                    lastName: apiResponse.data.userInfo.lastname,
                },
                createdAt: Date.now()
            };
            // get and sign JWT for authentication
            const token = await signJWT(payload);
            cookies().set({ name: 'session', value: token, httpOnly: true, secure: true, maxAge: 86400, sameSite: 'strict' });
            cookies().set({ name: 'token', value: apiResponse.data.token, httpOnly: true, secure: true, maxAge: 86400, sameSite: 'strict' });
            //return data to frontend and handle error and success states 
            return { status: 'success', message: apiResponse.responseMessage, statusCode: apiResponse.responseCode }
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