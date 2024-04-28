import { TokenDto } from '../api/types';
import { Token } from '../../../shared/lib/types/token';

export const mapTokenDtoToModel = (dto: TokenDto): Token => ({
    token: dto.token,
    refreshToken: dto.refreshToken,
});
