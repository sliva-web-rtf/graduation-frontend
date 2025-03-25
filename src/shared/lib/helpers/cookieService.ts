export namespace CookieService {
    export function set<T>(data: T, expiresDays = 7): Promise<void> {
        return new Promise((resolve) => {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + expiresDays);

            const expires = currentDate.toUTCString();
            const content = JSON.stringify(data);
            const encoded = encodeURIComponent(content);

            document.cookie = `userData=${encoded}; path=/signup; expires=${expires}`;

            resolve();
        });
    }
    export function clear(key = 'userData'): Promise<void> {
        return new Promise((resolve) => {
            document.cookie = `${key}=; Path=/signup; Max-Age=-1;`;

            resolve();
        });
    }
}
