export const trimQuotes = (str: string): string => {
    return str
        .trim()
        .replace(/^["']|["']$/g, '')
        .trim();
};
