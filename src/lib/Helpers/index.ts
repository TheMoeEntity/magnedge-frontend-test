
import { Md5 } from "ts-md5";
import { ChangeEvent } from "react";
import { StaticImageData } from "next/image";
//My Helper functions...
export class Helpers {

    static formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
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

    static isValidUrl = (url: string): boolean => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    static formatBackendDate(dateString: string | undefined) {

        const date = new Date(dateString || '');
        if (isNaN(date.getTime())) {
            throw new Error('Invalid date string');
        }
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZoneName: 'short'
        };

        const formatter = new Intl.DateTimeFormat('en-US', options);
        return formatter.format(date);
    }
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
