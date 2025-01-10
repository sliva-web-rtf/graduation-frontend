import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { STATUS } from '@/shared/api/status';
import { PersonalDataSchema } from '../types/personalDataSchema';
import { PersonalInfoFormSchema } from '../types/personalInfoFormSchema';
import { ProfessorSearchingStatus } from '@/widgets/Onboarding/model/types/professorStatus';
import { StudentSearchingStatus } from '../types/studentSearchingStatus';

const initialState: PersonalDataSchema = {
    isProfileLoading: STATUS.initial,
};

export const personalDataSlice = createSlice({
    name: 'personalData',
    initialState,
    reducers: {
        setStudentUpdatedProfileInfo: (state, action: PayloadAction<PersonalInfoFormSchema | undefined>) => {
            state.studentUpdatedProfileInfo = action.payload;
        },
        setProfessorUpdateProfileInfo: (state, action: PayloadAction<PersonalInfoFormSchema | undefined>) => {
            state.professorUpdatedProfileInfo = action.payload;
        },
        setStudentSearchingStatus: (state, action: PayloadAction<StudentSearchingStatus | undefined>) => {
            state.studentSearchingStatus = action.payload;
        },
        setProfessorSeacrhingStatus: (state, action: PayloadAction<ProfessorSearchingStatus | undefined>) => {
            state.professorSearhingStatus = action.payload;
        },
    },
});
export const { actions: personalDataActions } = personalDataSlice;
export const { reducer: personalDataReducer } = personalDataSlice;
