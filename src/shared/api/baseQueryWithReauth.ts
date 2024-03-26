import { QueryReturnValue } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
    BaseQueryApi,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
    createApi,
} from '@reduxjs/toolkit/query/react';
import { invalidateAccessToken } from './invalidateTokenEvent';
import { baseQuery } from './baseQuery';

const AUTH_ERROR_CODES = new Set([401]);

export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    const result = await baseQuery(args, api, extraOptions);

    if (typeof result?.error?.status === 'number' && AUTH_ERROR_CODES.has(result?.error?.status as number)) {
        api.dispatch(invalidateAccessToken());
    }

    return result;
};
