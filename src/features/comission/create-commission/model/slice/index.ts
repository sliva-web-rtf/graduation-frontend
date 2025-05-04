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

export const CREATE_COMMISSION_STEP = 'CREATE_COMMISSION_STEP';

export const initialState: CommissionFormSchema = {
    step: (CommissionStorageService.get(CREATE_COMMISSION_STEP) as CommissionFormStep) ?? CommissionFormStep.Info,
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
            Object.values(state.forms).forEach((form) => {
                form.isTouched = true;
            });
        },
        validateSteps: (state) => {
            const formSchemas = {
                info: infoFormSchema,
                groups: groupsFormSchema,
                students: studentsFormSchema,
                experts: expertsFormSchema,
            };

            Object.entries(state.forms).forEach(([key, form]) => {
                form.isTouched = true;
                form.isValid = formSchemas[key as keyof typeof formSchemas].safeParse(form.data).success;
            });
        },
        resetForm: () => {
            CommissionStorageService.clear();
            return initialState;
        },
    },
});

export const { actions: commissionFormActions, reducer: commissionFormReducer } = commissionFormSlice;
