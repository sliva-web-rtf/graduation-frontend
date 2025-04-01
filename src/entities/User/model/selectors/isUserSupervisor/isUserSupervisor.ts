import { StateSchema } from '@/app/providers/StoreProvider';
import { Role } from '../../types/role';

export const isUserSupervisor = (state: StateSchema) => state.user?.user?.roles.includes(Role.Supervisor) ?? false;
