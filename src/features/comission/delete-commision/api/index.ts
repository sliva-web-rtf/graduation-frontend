import { baseApi, TagTypes } from '@/shared/api';

export const commissionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        deleteCommission: build.mutation<void, { id: string }>({
            query: (body) => ({
                url: `/commissions`,
                method: 'DELETE',
                body,
            }),
            invalidatesTags: (result) => (result ? [TagTypes.Commissions] : []),
        }),
    }),
});

export const { useDeleteCommissionMutation } = commissionApi;
