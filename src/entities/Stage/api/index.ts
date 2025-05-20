import { baseApi } from '@/shared/api';
import { CurrentStageModel, StagesDto, StagesModel } from '../model';

export const stageApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStages: build.query<StagesModel, void>({
            query: () => ({
                url: '/stages',
            }),
            transformResponse: (response: StagesDto) => response.stages,
        }),
        getStagesOptions: build.query<string[], void>({
            query: () => ({
                url: '/stages',
            }),
            transformResponse: (response: StagesDto) => response.stages.map((stage) => stage.name),
        }),
        getCurrentStage: build.query<CurrentStageModel, void>({
            query: () => ({
                url: '/stages',
            }),
            transformResponse: (response: StagesDto) => {
                const { stages } = response;
                const index = stages.findIndex((stage) => stage.isCurrent);
                const { name, beginsAt, endsAt, description, type } = stages[index];

                return {
                    name,
                    number: index + 1,
                    amount: stages.length,
                    beginsAt,
                    endsAt,
                    description,
                    type,
                };
            },
        }),
    }),
});

export const { useGetStagesQuery, useGetStagesOptionsQuery, useGetCurrentStageQuery } = stageApi;
