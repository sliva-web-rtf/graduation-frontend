import { CommissionDto } from '@/entities/Comission';
import { CommissionRequest } from '@/entities/Comission/model';
import { baseApi, isApiError, TagTypes } from '@/shared/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { CommissionFormSchema } from '../../create-commission';
import { transformDtoToFormData } from '../lib';
import { EditCommissionErrorResponse, EditCommissionRequest } from '../model';

const comissionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getCommission: build.query<CommissionFormSchema['forms'], CommissionRequest>({
            query: ({ id }) => ({
                url: `/commissions/${id}`,
            }),
            transformResponse: (response: CommissionDto) => transformDtoToFormData(response),
            providesTags: (result, error, arg) => [{ type: TagTypes.Commission, id: arg.id }],
        }),
        editCommission: build.mutation<EditCommissionErrorResponse, EditCommissionRequest>({
            query: (body) => ({
                url: `/commissions`,
                method: 'PUT',
                body,
            }),
            transformErrorResponse: (error: FetchBaseQueryError) => {
                if (isApiError(error)) {
                    return new Error(error.data.title);
                }

                return new Error('Произошла ошибка редактирования комиссии');
            },
            invalidatesTags: (result) => {
                if (!result?.commissionId) {
                    return [];
                }

                return [{ type: TagTypes.Commission, id: result?.commissionId }];
            },
        }),
    }),
});

export const { useGetCommissionQuery, useEditCommissionMutation } = comissionApi;
