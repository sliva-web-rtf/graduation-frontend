import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ToggleOptions } from '../types/toggleOptions';
import { TopicInfoSchema } from '../types/topicInfoSchema';

export const initialState: TopicInfoSchema = {
    option: ToggleOptions.Info,
    options: Object.values(ToggleOptions),
};

const topicInfoSlice = createSlice({
    name: 'topic-info',
    initialState,
    reducers: {
        setOption: (state, action: PayloadAction<TopicInfoSchema['option']>) => {
            state.option = action.payload;
        },
    },
});

export const { actions: topicInfoActions } = topicInfoSlice;
export const { reducer: topicInfoReducer } = topicInfoSlice;
