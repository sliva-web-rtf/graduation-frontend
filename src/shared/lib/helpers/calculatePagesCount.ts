export const calculatePagesCount = (totalItems: number, pageSize: number): number =>
    Math.max(Math.ceil(totalItems / pageSize), 1);
