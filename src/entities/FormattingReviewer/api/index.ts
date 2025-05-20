import { baseApi } from '@/shared/api';
import { FormattingReviewersDto, FormattingReviewersModel, FormattingReviewersRequest } from '../model';

const baseParams: FormattingReviewersRequest = {
    page: 0,
    size: 30,
};

const formattingReviewerApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getFormattingReviewers: build.query<FormattingReviewersModel, FormattingReviewersRequest>({
            query: (params) => ({
                url: '/academic-groups/formatting-reviewers',
                params: {
                    ...baseParams,
                    ...params,
                },
            }),
            transformResponse: (response: FormattingReviewersDto) => response.formattingReviewers,
        }),
    }),
});

export const { useGetFormattingReviewersQuery } = formattingReviewerApi;
