import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginStatus = (state: StateSchema) => state?.loginForm?.status;
