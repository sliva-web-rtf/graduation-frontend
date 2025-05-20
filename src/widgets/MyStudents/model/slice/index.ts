import { stageApi } from '@/entities/Stage';
import { LocalStorageService } from '@/shared/lib/helpers/localStorage';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyStudentsSchema } from '../types';

const KEY = 'STAGE';

export const initialState: MyStudentsSchema = {
    stage: LocalStorageService.get(KEY) || '',
    query: '',
    commissions: [],
    selectedStudents: [],
    fromDate: null,
    toDate: null,
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
        setCommissions: (state, action: PayloadAction<MyStudentsSchema['commissions']>) => {
            state.commissions = action.payload;
        },
        setQuery: (state, action: PayloadAction<MyStudentsSchema['query']>) => {
            state.query = action.payload;
        },
        setSelectedStudents: (state, action: PayloadAction<MyStudentsSchema['selectedStudents']>) => {
            state.selectedStudents = action.payload;
        },
        setFromDate: (state, action: PayloadAction<MyStudentsSchema['fromDate']>) => {
            state.fromDate = action.payload;
        },
        setToDate: (state, action: PayloadAction<MyStudentsSchema['toDate']>) => {
            state.toDate = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(stageApi.endpoints.getCurrentStage.matchFulfilled, (state, { payload }) => {
            const currentStage = LocalStorageService.get(KEY);

            if (!currentStage && payload) {
                const { name } = payload;

                state.stage = name;
                LocalStorageService.save(KEY, name);
            }
        });
    },
});

export const { actions: myStudentsActions, reducer: myStudentsReducer } = myStudentsSlice;
