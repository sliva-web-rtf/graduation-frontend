import { baseApi, isApiError, TagTypes } from '@/shared/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { CreateCommissionRequest, CreateCommissionResponse } from '../model';

export const commissionApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createCommission: build.mutation<CreateCommissionResponse, CreateCommissionRequest>({
            query: (body) => ({
                url: '/commissions',
                method: 'POST',
                body,
            }),
            transformErrorResponse: (error: FetchBaseQueryError) => {
                if (isApiError(error)) {
                    return new Error(error.data.title);
                }

                return new Error('Произошла ошибка при создании комиссии');
            },
            invalidatesTags: (result) => {
                if (!result?.commissionId) {
                    return [];
                }

                return [
                    TagTypes.Commissions,
                    TagTypes.CommissionStudents,
                    TagTypes.Experts,
                    TagTypes.AcademicGroups,
                    TagTypes.MyStudents,
                ];
            },
        }),
    }),
});

export const { useCreateCommissionMutation } = commissionApi;
