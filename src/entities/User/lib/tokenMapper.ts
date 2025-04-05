import { Token } from '../../../shared/lib/types/token';
import { TokenDto } from '../api/types';

export const mapTokenDtoToModel = (dto: TokenDto): Token => ({
    token: dto.token,
});
