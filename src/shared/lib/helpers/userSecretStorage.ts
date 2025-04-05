import { Token } from '../types/token';
import { LocalStorageService } from './localStorage';

export namespace UserSecretStorageService {
    const USER_SECRET_KEY = 'USER_SECRET_KEY';

    export function save(secret: Token) {
        LocalStorageService.save(USER_SECRET_KEY, secret);
    }

    export function remove() {
        LocalStorageService.remove(USER_SECRET_KEY);
    }

    export function get(): Token | null {
        return LocalStorageService.get<Token>(USER_SECRET_KEY);
    }

    export function clear() {
        LocalStorageService.clear();
    }

    export function isValid(): boolean {
        const secret = get();

        return secret !== null;
    }
}
