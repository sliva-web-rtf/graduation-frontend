import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
    type FetchArgs,
    type FetchBaseQueryError,
    type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta> =
    fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: async (headers) => {
            const token = await UserSecretStorageService.get();
            if (token != null) {
                headers.set('Authorization', `Bearer ${token.token}`);
            }
            return headers;
        },
    });
