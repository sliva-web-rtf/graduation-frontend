import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

/* eslint-disable no-unused-vars */
export const rtkQueryErrorMiddleware: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
    if (isRejectedWithValue(action)) {
        toast.error(action.payload.data);
    }

    return next(action);
};
