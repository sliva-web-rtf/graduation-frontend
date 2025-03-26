import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PersonInfoSchema } from '../types/usersInfoSchema';
import { ToggleOptions } from '../types/toggleOptions';

export const initialState: PersonInfoSchema = {
    option: ToggleOptions.Portfolio,
    options: Object.values(ToggleOptions),
};

export const PersonInfoSlice = createSlice({
    name: 'person-info',
    initialState,
    reducers: {
        setOption: (state, action: PayloadAction<PersonInfoSchema['option']>) => {
            state.option = action.payload;
        },
    },
});

export const { actions: personInfoActions } = PersonInfoSlice;
export const { reducer: personInfoReducer } = PersonInfoSlice;
