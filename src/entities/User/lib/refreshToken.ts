import { RefreshTokenDto } from '../api/types';
import { RefreshToken } from '../model/types/refresh';

export function refreshTokenToDto(model: RefreshToken): RefreshTokenDto {
    return {
        userId: model.userId,
        refreshToken: model.refreshToken,
    };
}
