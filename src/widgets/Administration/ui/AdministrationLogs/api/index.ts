import { baseApi } from '@/shared/api';
import { removeEmptyValues } from '@/shared/lib/helpers/removeEmptyValues';
import queryString from 'query-string';
import { LogsRequest, LogsResponse } from '../model';

export const logsApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getLogs: build.query<LogsResponse, LogsRequest>({
            query: (params) => ({
                url: queryString.stringifyUrl({
                    url: '/logs',
                    query: removeEmptyValues(params),
                }),
            }),
            transformErrorResponse: (error: any) => {
                if (error?.data?.title) {
                    return new Error(error?.title);
                }

                return new Error('Произошла ошибка при получении таблицы студентов');
            },
        }),
    }),
});

export const { useGetLogsQuery } = logsApi;
