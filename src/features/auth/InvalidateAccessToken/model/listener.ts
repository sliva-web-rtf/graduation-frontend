import { createListenerMiddleware, type TypedStartListening } from '@reduxjs/toolkit';
import { AppDispatch, StateSchema } from 'app/providers/StoreProvider';
import { userActions } from 'entities/User';
import { refreshToken } from 'entities/User/model/services/refreshToken';
import { toast } from 'react-toastify';
import { invalidateAccessToken } from 'shared/api';

export const invalidateAccessTokenListener = createListenerMiddleware();

export type TypedListening = TypedStartListening<StateSchema, AppDispatch>;

export const startInvalidateAccessTokenListener = invalidateAccessTokenListener.startListening as TypedListening;

startInvalidateAccessTokenListener({
    actionCreator: invalidateAccessToken,
    effect: async (_, api) => {
        api.dispatch(refreshToken()).then((dispatchMeta) => {
            if (dispatchMeta.meta.requestStatus === 'rejected') {
                toast.error('Произошла ошибка в авторизации');
                api.dispatch(userActions.logout());
            }
        });
    },
});
