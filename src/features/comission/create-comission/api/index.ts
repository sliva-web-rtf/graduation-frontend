import { baseApi, TagTypes } from '@/shared/api';

export const commissionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createCommission: build.mutation<void, void>({
            query: (body) => ({
                url: '/commissions',
                method: 'POST',
                body,
            }),
            transformErrorResponse: () => {
                return new Error('Произошла ошибка при создании комиссии');
            },
            invalidatesTags: (result) => (result ? [TagTypes.Commissions] : []),
        }),
    }),
});

export const { useCreateCommissionMutation } = commissionApi;
