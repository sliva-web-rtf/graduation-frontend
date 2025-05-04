export const truncateText = (text: string, maxLength: number) => {
    if (!maxLength || text.length <= maxLength) return text;

    return `${text.slice(0, maxLength)}...`;
};
