import { StateSchema } from '@/app/providers/StoreProvider';
import { initialState } from '../slice';
import { CommissionFormSchema } from '../types';

export const getCommissionForm = (state: StateSchema): CommissionFormSchema => state.commissionForm || initialState;

export const getCommissionInfoForm = (state: StateSchema): CommissionFormSchema['forms']['info'] =>
    state.commissionForm?.forms.info || initialState.forms.info;

export const getCommissionExpertsForm = (state: StateSchema): CommissionFormSchema['forms']['experts'] =>
    state.commissionForm?.forms.experts || initialState.forms.experts;

export const getCommissionGroupsForm = (state: StateSchema): CommissionFormSchema['forms']['groups'] =>
    state.commissionForm?.forms.groups || initialState.forms.groups;

export const getCommissionStudentsForm = (state: StateSchema): CommissionFormSchema['forms']['students'] =>
    state.commissionForm?.forms.students || initialState.forms.students;
