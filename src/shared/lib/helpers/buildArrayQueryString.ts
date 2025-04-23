export const buildArrayQueryString = (array: string[] | number[] | undefined | null, param: string) =>
    array?.map((item) => `${param}=${item}`).join('&') ?? '';
