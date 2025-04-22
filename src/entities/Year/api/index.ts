import { baseApi, TagTypes } from '@/shared/api';

export const yearApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDefaultYear: build.query<string, void>({
            query: () => ({
                url: '/years/current',
            }),
            transformResponse: (response: { year: string }) => response.year,
            providesTags: [TagTypes.DefaultYear],
        }),
        setDefaultYear: build.mutation<void, { year: string }>({
            query: (body) => ({
                url: '/years/current',
                method: 'POST',
                body,
            }),
            invalidatesTags: (result) => (result ? [TagTypes.DefaultYear] : []),
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
