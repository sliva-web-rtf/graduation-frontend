import { baseApi, isApiError } from '@/shared/api';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { CopyStageRequest, CurrentStageModel, StagesDto, StagesModel } from '../model';

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

        copyStage: build.mutation<void, CopyStageRequest>({
            query: (body) => ({
                url: '/qualification-works/copy-stage-data',
                method: 'POST',
                params: body,
            }),

            transformErrorResponse: (error: FetchBaseQueryError) => {
                if (isApiError(error)) {
                    return new Error(error.data.title);
                }

                return new Error('Произошла ошибка при копировании этапа');
            },
        }),
    }),
});

export const { useGetStagesQuery, useGetStagesOptionsQuery, useGetCurrentStageQuery, useCopyStageMutation } = stageApi;
