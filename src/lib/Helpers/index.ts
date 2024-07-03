
import { Md5 } from "ts-md5";
import { ChangeEvent } from "react";
import CryptoJS from 'crypto-js';
import { StaticImageData } from "next/image";
import { vendorPrice } from "@/types";
export class Helpers {

    static formatBytes(bytes: number, decimals = 2) {
        if (!+bytes) return "0 Bytes";

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
    }
    static formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };
    static handleImageChange = (userFile: File | null, setCurrProfile: (file: string | ArrayBuffer | null) => void) => {

        if (userFile) {
            const reader = new FileReader();
            reader.onload = () => {
                setCurrProfile(reader.result);
            };
            reader.readAsDataURL(userFile);
        }
    };
    static setGreeting = (): string => {
        const hour = new Date().getHours();

        let timeCheck =
            hour < 12
                ? "Good Morning"
                : hour < 18
                    ? "Good Afternoon"
                    : "Good Evening";

        return timeCheck;
    };
    static handleFileSelected = async (
        e: ChangeEvent<HTMLInputElement>,
        toast: any,
        setSize: any,
        setUserFile: any,
        setCurrFile: any,
        size: string,
        handleFileRead: (file: File) => Promise<void>
    ) => {
        const files = (e.target as HTMLInputElement).files;

        if (!files || files.length === 0) {
            return;
        }
        const fileType = files[0].type;
        console.log(fileType);
        const acceptedFileTypes: string[] = [
            "text/plain"
        ];
        if (!acceptedFileTypes.includes(fileType)) {
            toast.error('File type not supported. Kindly upload a valid txt file', { duration: 5000 })
            return;
        }

        const sizes = parseFloat(String(files[0].size / (1024 * 1024))).toFixed(2);
        console.log(sizes);
        setSize(this.formatBytes(files[0].size));
        setCurrFile(files[0].name + `, ${size}`);
        console.log(files[0])
        handleFileRead(files[0])
        if (Number(sizes) > 2) {
            toast.error('Max file size is 2MB', { duration: 5000 })
            return;
        } else {
            setUserFile(files[0]);
        }

    };
    static isValidUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    static encryptData = (data: string) => {
        const secretKey = this.formatDate(new Date())
        return CryptoJS.AES.encrypt(data, secretKey).toString();
    }
    static convertFileToBase64 = (file: File): Promise<string> => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });
    };
    static hashAgentCode(host_name: string): string {
        const strToMD5 = host_name + this.formatDate(new Date())
        const hashed = Md5.hashStr(strToMD5)

        return hashed
    }
    static getMaxAge = (expiresAt: string): number => {
        const expiresAtDate = new Date(expiresAt);
        const now = new Date();
        const diffInMilliseconds = expiresAtDate.getTime() - now.getTime();
        const maxAge = Math.floor(diffInMilliseconds / 1000);
        return maxAge
    }
    static extractNumber(input: string): number | null {
        const pattern = /\b(100|200|500|1000)\b/;
        const match = input.match(pattern);

        return match ? parseInt(match[0], 10) : null;
    }
    static formatNetwork = (data: vendorPrice[], denomination: number, network:string| "MTN" | "GLO" | "AIRTEL" | "9MOBILE") => {
        const formatted = data.map(item => {
            const unitPrice = item.price
            const pinPrice = '₦' + (denomination / 100) * unitPrice
            return { ...item, formatted: `${item.network} ${denomination} - ${pinPrice}` }
        })
        const singleItem = formatted.find(item => item.network == network)?.formatted
        return singleItem
    }
    static shuffleArray = (arr: any[]) => {
        const arrCopy = arr.slice()
        for (let i = arrCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arrCopy[i], arrCopy[j]] = [arrCopy[j], arrCopy[i]];
        }
        return arrCopy
    }

    static validateEmail = (email: string) => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return true
        }
        return false
    }
}
