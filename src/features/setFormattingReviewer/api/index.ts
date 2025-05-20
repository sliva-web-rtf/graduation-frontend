import { baseApi, isApiError, TagTypes } from '@/shared/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SetFormattingReviewerRequest, SetFormattingReviewerResponse } from '../model';

const formattingReviewerApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        setFormattingReviewer: build.mutation<SetFormattingReviewerResponse, SetFormattingReviewerRequest>({
            query: (body) => ({
                url: `/academic-groups/formatting-reviewers`,
                method: 'POST',
                body,
            }),
            transformErrorResponse: (error: FetchBaseQueryError) => {
                if (isApiError(error)) {
                    return new Error(error.data.title);
                }

                return new Error('Произошла ошибка при назначении нормоконтролера');
            },
            invalidatesTags: (result) => {
                if (!result?.academicGroupId) {
                    return [];
                }

                return [{ type: TagTypes.AcademicGroup, id: result.academicGroupId }];
            },
        }),
    }),
});

export const { useSetFormattingReviewerMutation } = formattingReviewerApi;
