export namespace LocalStorageService {
    export function save<T>(key: string, data: T): void {
        localStorage.setItem(key, JSON.stringify(data));
    }

    export function get<T = unknown>(key: string): T | null {
        const item = localStorage.getItem(key);
        if (item == null) return null;

        try {
            return JSON.parse(item) as T;
        } catch {
            console.error(`Failed to parse localStorage item by key "${key}"`);
            return null;
        }
    }

    export function remove(key: string): void {
        localStorage.removeItem(key);
    }

    export function clear(): void {
        localStorage.clear();
    }
}
