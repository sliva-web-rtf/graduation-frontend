import { baseApi } from '@/shared/api';
import { toast } from 'react-toastify';
import { type Token } from '../../../shared/lib/types/token';

export const yearApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDefaultYear: build.query<string, void>({
            query: () => ({
                url: '/years/current',
            }),
            transformResponse: (response: { year: string }) => response.year,
        }),
        setDefaultYear: build.mutation<Token, { year: string }>({
            query: (body) => ({
                url: '/years/current',
                method: 'POST',
                body,
            }),
            transformErrorResponse: () => toast.error('Не удалось установить учебный год по умолчанию'),
        }),
        getYears: build.query<string[], void>({
            query: () => ({
                url: '/years',
            }),
            transformResponse: (response: { years: string[] }) => response.years,
        }),
    }),
});

export const { useGetDefaultYearQuery, useSetDefaultYearMutation, useGetYearsQuery } = yearApi;
