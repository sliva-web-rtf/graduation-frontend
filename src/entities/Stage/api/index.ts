import { baseApi } from '@/shared/api';
import { StagesDto, StagesModel } from '../model';

export const stageApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStages: build.query<StagesModel, void>({
            query: () => ({
                url: '/stages',
            }),
            transformResponse: (response: StagesDto) => response.stages,
        }),
    }),
});

export const { useGetStagesQuery } = stageApi;
