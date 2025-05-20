import { baseApi } from '@/shared/api';
import { QualificationWorkDto } from '../model';
import { QualificationWorkRequest } from '../model/types';

export const qualificationWorkApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getQualificationWork: build.query<any, QualificationWorkRequest>({
            query: ({ id, ...params }) => ({
                url: `/qualification-works/${id}`,
                params,
            }),
            transformResponse: (response: QualificationWorkDto) => {
                return {
                    ...response.mainInfo,
                    ...response.formattingReview,
                    ...response.stageInfo,
                };
            },
        }),
    }),
});

export const { useGetQualificationWorkQuery } = qualificationWorkApi;
