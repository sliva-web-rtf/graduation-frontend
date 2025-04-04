export const getCookie = (name: string) => {
    const cookies = document.cookie.split('; ');
    const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));
    if (cookie) {
        const value = cookie.split('=')[1];
        return JSON.parse(decodeURIComponent(value));
    }

    return null;
};
