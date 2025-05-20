import { StateSchema } from '@/app/providers/StoreProvider';
import { Role } from '../../types/role';

export const isUserHeadSecretary = (state: StateSchema) =>
    state.user?.user?.roles.includes(Role.HeadSecretary) ?? false;
