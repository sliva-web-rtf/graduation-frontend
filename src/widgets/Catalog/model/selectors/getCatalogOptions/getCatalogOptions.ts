import { StateSchema } from 'app/providers/StoreProvider';
import { Role } from 'entities/User';
import { initialState } from '../../slice/catalogSlice';

export const getCatalogOptions = (state: StateSchema) =>
    state.user.authData?.roles.includes(Role.Professor) ? initialState.options.slice(1) : initialState.options;
