import { CommissionDto } from '@/entities/Comission';
import { CommissionRequest } from '@/entities/Comission/model';
import { baseApi, TagTypes } from '@/shared/api';
import { CommissionFormSchema } from '../../create-commission';
import { transformDtoToFormData } from '../lib';
import { EditCommissionRequest } from '../model';

const comissionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCommission: build.query<CommissionFormSchema['forms'], CommissionRequest>({
            query: ({ id }) => ({
                url: `/commissions/${id}`,
            }),
            transformResponse: (response: CommissionDto) => transformDtoToFormData(response),
            providesTags: (result, error, arg) => [{ type: TagTypes.Commission, id: arg.id }],
        }),
        editCommission: build.mutation<void, EditCommissionRequest>({
            query: (body) => ({
                url: `/commissions`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: (result, error, arg) => [{ type: TagTypes.Commission, id: arg.commissionId }],
        }),
    }),
});

export const { useGetCommissionQuery, useEditCommissionMutation } = comissionApi;
