import { StateSchema } from '@/app/providers/StoreProvider';
import { Role } from '../../types/role';

export const isUserSecretary = (state: StateSchema) => state.user?.user?.roles.includes(Role.Secretary) ?? false;
