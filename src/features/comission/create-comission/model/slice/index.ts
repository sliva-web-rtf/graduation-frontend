import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommissionStorageService, getStepFromSearchParams } from '../../lib';
import {
    CommissionFormSchema,
    CommissionFormStep,
    ExpertsFormSchema,
    expertsFormSchema,
    groupsFormSchema,
    GroupsFormSchema,
    infoFormSchema,
    InfoFormSchema,
    studentsFormSchema,
    StudentsFormSchema,
} from '../types';

export const initialState: CommissionFormSchema = {
    step: CommissionFormStep.Info,
    steps: [
        CommissionFormStep.Info,
        CommissionFormStep.Experts,
        CommissionFormStep.Groups,
        CommissionFormStep.Students,
        CommissionFormStep.Submit,
    ],
    forms: {
        info: {
            data: null,
            isValid: false,
            isTouched: false,
        },
        experts: {
            data: null,
            isValid: false,
            isTouched: false,
        },
        groups: {
            data: null,
            isValid: false,
            isTouched: false,
        },
        students: {
            data: null,
            isValid: false,
            isTouched: false,
        },
    },
};

export const commissionFormSlice = createSlice({
    name: 'commissionForm',
    initialState,
    reducers: {
        setForms: (state, action: PayloadAction<Partial<CommissionFormSchema['forms']>>) => {
            const { info, experts, groups, students } = action.payload;

            if (info) {
                state.forms.info = info;
            }

            if (experts) {
                state.forms.experts = experts;
            }

            if (groups) {
                state.forms.groups = groups;
            }

            if (students) {
                state.forms.students = students;
            }
        },
        setStep: (state, action: PayloadAction<CommissionFormSchema['step']>) => {
            state.step = action.payload;
        },
        initStep: (state, action: PayloadAction<URLSearchParams>) => {
            state.step = getStepFromSearchParams(action.payload);
        },
        updateInfoForm: (state, action: PayloadAction<InfoFormSchema>) => {
            const data = action.payload;
            const isValid = infoFormSchema.safeParse(action.payload).success;
            const isTouched = true;

            state.forms.info = { data, isValid, isTouched };

            CommissionStorageService.save('COMISSION_INFO', { data, isValid, isTouched });
        },
        updateExpertsForm: (state, action: PayloadAction<ExpertsFormSchema>) => {
            const data = action.payload;
            const isValid = expertsFormSchema.safeParse(action.payload).success;
            const isTouched = true;

            state.forms.experts = { data, isValid, isTouched };

            CommissionStorageService.save('COMMISSION_EXPERTS', { data, isValid, isTouched });
        },
        updateGroupsForm: (state, action: PayloadAction<GroupsFormSchema>) => {
            const data = action.payload;
            const isValid = groupsFormSchema.safeParse(action.payload).success;
            const isTouched = true;

            state.forms.groups = { data, isValid, isTouched };

            CommissionStorageService.save('COMMISSION_GROUPS', { data, isValid, isTouched });
        },
        updateStudentsForm: (state, action: PayloadAction<StudentsFormSchema>) => {
            const data = action.payload;
            const isValid = studentsFormSchema.safeParse(action.payload).success;
            const isTouched = true;

            state.forms.students = { data, isValid, isTouched };

            CommissionStorageService.save('COMMISSION_STUDENTS', { data, isValid, isTouched });
        },
        markStepsAsTouched: (state) => {
            state.forms.info.isTouched = true;
            state.forms.groups.isTouched = true;
            state.forms.students.isTouched = true;
        },
        resetForm: () => {
            CommissionStorageService.clear();
            return initialState;
        },
    },
});

export const { actions: commissionFormActions, reducer: commissionFormReducer } = commissionFormSlice;
