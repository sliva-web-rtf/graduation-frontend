import { TokenDto } from '../api/types';
import { Token } from '../model/types/token';

export const mapTokenDtoToModel = (dto: TokenDto): Token => ({
    token: dto.token,
});
