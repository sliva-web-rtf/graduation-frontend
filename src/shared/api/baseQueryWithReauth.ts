import { BaseQueryApi, FetchArgs } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { UserSecretStorageService } from 'shared/lib/helpers/userSecretStorage';
import { Token } from 'shared/lib/types/token';
import { userActions } from 'entities/User';
import { baseQuery } from './baseQuery';

const AUTH_ERROR_CODES = new Set([401]);
const mutex = new Mutex();

export const baseQueryWithReauth = async (args: string | FetchArgs, api: BaseQueryApi, extraOptions: {}) => {
    await mutex.waitForUnlock();
    let result = await baseQuery(args, api, extraOptions);

    if (typeof result?.error?.status === 'number' && AUTH_ERROR_CODES.has(result?.error?.status as number)) {
        if (!mutex.isLocked()) {
            const release = await mutex.acquire();
            const tokens = await UserSecretStorageService.get();
            await UserSecretStorageService.clear();
            try {
                const refreshResult = await baseQuery(
                    {
                        url: '/api/auth',
                        method: 'PUT',
                        body: {
                            refreshToken: tokens?.refreshToken,
                        },
                    },
                    api,
                    extraOptions,
                );
                if (
                    refreshResult.data &&
                    typeof refreshResult.data === 'object' &&
                    'token' in refreshResult.data &&
                    'refreshToken' in refreshResult.data
                ) {
                    await UserSecretStorageService.save(refreshResult.data as Token);
                    result = await baseQuery(args, api, extraOptions);
                } else {
                    api.dispatch(userActions.logout());
                }
            } finally {
                release();
            }
        } else {
            await mutex.waitForUnlock();
            result = await baseQuery(args, api, extraOptions);
        }
    }

    return result;
};
