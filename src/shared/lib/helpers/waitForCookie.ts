import { getCookie } from './getCookie';

export const waitForCookie = async (name: string, timeout = 10000, interval = 50) => {
    const startTime = Date.now();

    const checkCookie = async (): Promise<any> => {
        const cookie = getCookie(name);
        if (cookie) {
            return cookie;
        }

        if (Date.now() - startTime >= timeout) {
            throw new Error(`Cookie ${name} не установлена в течение ${timeout}ms`);
        }

        await new Promise((resolve) => {
            setTimeout(resolve, interval);
        });
        return checkCookie();
    };

    return checkCookie();
};
