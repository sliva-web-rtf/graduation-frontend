import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommissionStorageService } from '../../lib';
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
    isEditMode: false,
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
        initEditMode: (state, action: PayloadAction<CommissionFormSchema['isEditMode']>) => {
            state.isEditMode = action.payload;
            state.step = CommissionFormStep.Info;
        },
        setForms: {
            reducer: (state, action?: PayloadAction<Partial<CommissionFormSchema['forms']>>) => {
                if (!action?.payload) {
                    state.forms = initialState.forms;
                    return;
                }

                const { info, experts, groups, students } = action.payload;

                state.forms.info = info ?? initialState.forms.info;
                state.forms.experts = experts ?? initialState.forms.experts;
                state.forms.groups = groups ?? initialState.forms.groups;
                state.forms.students = students ?? initialState.forms.students;
            },
            prepare: (payload?: Partial<CommissionFormSchema['forms']> | null) => {
                return { payload: payload ?? initialState.forms };
            },
        },
        setStep: (state, action: PayloadAction<CommissionFormSchema['step']>) => {
            state.step = action.payload;
        },
        updateInfoForm: (state, action: PayloadAction<InfoFormSchema>) => {
            const data = action.payload;
            const isValid = infoFormSchema.safeParse(action.payload).success;

            state.forms.info = { data, isValid, isTouched: true };
        },
        updateExpertsForm: (state, action: PayloadAction<ExpertsFormSchema>) => {
            const data = action.payload;
            const isValid = expertsFormSchema.safeParse(action.payload).success;

            state.forms.experts = { data, isValid, isTouched: true };
        },
        updateGroupsForm: (state, action: PayloadAction<GroupsFormSchema>) => {
            const data = action.payload;
            const isValid = groupsFormSchema.safeParse(action.payload).success;

            state.forms.groups = { data, isValid, isTouched: true };
        },
        updateStudentsForm: (state, action: PayloadAction<StudentsFormSchema>) => {
            const data = action.payload;
            const isValid = studentsFormSchema.safeParse(action.payload).success;

            state.forms.students = { data, isValid, isTouched: true };
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
        saveForms: (state) => {
            if (!state.isEditMode) {
                CommissionStorageService.save('COMISSION_INFO', state.forms.info);
                CommissionStorageService.save('COMMISSION_EXPERTS', state.forms.experts);
                CommissionStorageService.save('COMMISSION_GROUPS', state.forms.groups);
                CommissionStorageService.save('COMMISSION_STUDENTS', state.forms.students);
            }
        },
        resetEditMode: () => {
            return initialState;
        },
        resetForm: () => {
            CommissionStorageService.clear();
            return initialState;
        },
    },
});

export const { actions: commissionFormActions, reducer: commissionFormReducer } = commissionFormSlice;
