import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProfileOption } from '../types/profileOption';
import { ProfileSchema } from '../types/profileSchema';

export const initialState: ProfileSchema = {
    option: ProfileOption.PersonalData,
    options: Object.values(ProfileOption),
};

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setOption: (state, action: PayloadAction<ProfileSchema['option']>) => {
            state.option = action.payload;
        },
        setOptions: (state, action: PayloadAction<ProfileSchema['options']>) => {
            state.options = action.payload;
        },
    },
});

export const { actions: profileActions } = profileSlice;
export const { reducer: profileReducer } = profileSlice;
