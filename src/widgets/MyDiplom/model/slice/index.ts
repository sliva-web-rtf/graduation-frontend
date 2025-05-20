import { stageApi } from '@/entities/Stage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { type DiplomSchema, StageOptions } from '../types';

const initialStage: DiplomSchema['stage'] = { name: StageOptions.Main, type: 'Defence' };
export const initialState: DiplomSchema = {
    stage: initialStage,
    stages: [initialStage],
    stageOptions: [],
};

export const diplomSlice = createSlice({
    name: 'diplom',
    initialState,
    reducers: {
        setStage: (state, action: PayloadAction<DiplomSchema['stage']>) => {
            state.stage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(stageApi.endpoints.getStages.matchFulfilled, (state, { payload }) => {
            const stages = payload.map((stage) => {
                return {
                    name: stage.name,
                    type: stage.type,
                    description: stage.description,
                    endsAt: stage.endsAt,
                };
            });
            state.stages = [initialStage, ...stages];
            state.stageOptions = [initialStage.name, ...stages.map((stage) => stage.name)];
        });
        builder.addMatcher(stageApi.endpoints.getCurrentStage.matchFulfilled, (state, { payload }) => {
            state.stage = payload;
        });
    },
});

export const { actions: diplomActions } = diplomSlice;
export const { reducer: diplomReducer } = diplomSlice;
