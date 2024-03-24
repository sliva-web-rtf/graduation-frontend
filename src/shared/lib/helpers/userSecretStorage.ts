import { LocalStorageService } from './localStorage';

export namespace UserSecretStorageService {
    const USER_SECRET_KEY = 'USER_SECRET_KEY';

    export async function save(secret: string): Promise<void> {
        await LocalStorageService.save(USER_SECRET_KEY, secret);
    }

    export async function remove(): Promise<void> {
        await LocalStorageService.remove(USER_SECRET_KEY);
    }

    export function get(): Promise<string | null> {
        return LocalStorageService.get<string>(USER_SECRET_KEY);
    }

    export async function clear(): Promise<void> {
        await LocalStorageService.clear();
    }

    export async function isValid(): Promise<boolean> {
        const secret = await get();
        return secret !== null;
    }
}
