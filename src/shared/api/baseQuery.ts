import { StateSchema } from '@/app/providers/StoreProvider';
import { UserSecretStorageService } from '@/shared/lib/helpers/userSecretStorage';
import { type BaseQueryFn } from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import {
    type FetchArgs,
    type FetchBaseQueryError,
    type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query/fetchBaseQuery';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta> =
    fetchBaseQuery({
        baseUrl: __API__,
        prepareHeaders: async (headers, { getState }) => {
            const token = await UserSecretStorageService.get();
            if (token != null) {
                headers.set('Authorization', `Bearer ${token.token}`);
            }

            const { year } = getState() as StateSchema;
            const { academicYear } = year;

            if (academicYear) {
                headers.set('X-Year', academicYear);
            }

            return headers;
        },
    });
