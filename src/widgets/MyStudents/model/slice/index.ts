import { stageApi } from '@/entities/Stage';
import { LocalStorageService } from '@/shared/lib/helpers/localStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyStudentsSchema } from '../types';

const KEY = 'STAGE';

export const initialState: MyStudentsSchema = {
    stage: LocalStorageService.get(KEY) || '',
    query: '',
    commission: '',
    selectedStudents: [],
};

const myStudentsSlice = createSlice({
    name: 'myStudents',
    initialState,
    reducers: {
        setStage: (state, action: PayloadAction<MyStudentsSchema['stage']>) => {
            const { payload } = action;
            state.stage = payload;
            LocalStorageService.save(KEY, payload);
        },
        setCommission: (state, action: PayloadAction<MyStudentsSchema['commission']>) => {
            state.commission = action.payload;
        },
        setQuery: (state, action: PayloadAction<MyStudentsSchema['query']>) => {
            state.query = action.payload;
        },
        setSelectedStudents: (state, action: PayloadAction<MyStudentsSchema['selectedStudents']>) => {
            state.selectedStudents = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(stageApi.endpoints.getStages.matchFulfilled, (state, { payload }) => {
            const currentStage = LocalStorageService.get(KEY);

            if (!currentStage && payload[0]) {
                // eslint-disable-next-line prefer-destructuring
                state.stage = payload[0];
                LocalStorageService.save(KEY, payload[0]);
            }
        });
    },
});

export const { actions: myStudentsActions, reducer: myStudentsReducer } = myStudentsSlice;
