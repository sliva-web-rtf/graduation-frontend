import { StateSchema } from '@/app/providers/StoreProvider';
import { Role } from '../../types/role';

export const isUserStudent = (state: StateSchema) => state.user?.user?.roles.includes(Role.Student) ?? false;
