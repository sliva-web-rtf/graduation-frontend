import { type LoginDto } from '../api/types';
import { type Login } from '../model/types/login';

export function loginToDto(model: Login): LoginDto {
    return {
        userName: model.email,
        password: model.password,
    };
}
