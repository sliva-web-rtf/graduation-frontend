import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserStatus = (state: StateSchema) => state.user.userStatus;
