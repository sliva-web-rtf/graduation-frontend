import { baseApi, TagTypes } from '@/shared/api';
import { CreateCommissionRequest, CreateCommissionResponse } from '../model';

export const commissionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createCommission: build.mutation<CreateCommissionResponse, CreateCommissionRequest>({
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
