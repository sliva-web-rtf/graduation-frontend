import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit';
import { AppDispatch, StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';
import { refreshQuery } from 'entities/User/api/userApi';
import { refreshToken } from 'entities/User/model/services/refreshToken';
import { invalidateAccessToken } from 'shared/api';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';

export const invalidateAccessTokenListener = createListenerMiddleware();

export type TypedListening = TypedStartListening<StateSchema, AppDispatch>;

export const startInvalidateAccessTokenListener = invalidateAccessTokenListener.startListening as TypedListening;

startInvalidateAccessTokenListener({
    actionCreator: invalidateAccessToken,
    effect: async (_, api) => {
        try {
            await api.dispatch(refreshToken());
        } catch {
            api.dispatch(userActions.logout());
        }
    },
});
