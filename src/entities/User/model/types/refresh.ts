import { type Token } from 'shared/lib/types/token';
import { type User } from './user';

export interface RefreshToken {
    userId: User['id'];
    refreshToken: Token['refreshToken'];
}
