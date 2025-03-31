export const calculatePagesCount = (totalItems: number, size: number): number =>
    Math.max(Math.ceil(totalItems / size), 1);
