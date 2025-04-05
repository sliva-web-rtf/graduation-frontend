import { StateSchema } from '@/app/providers/StoreProvider';

export const getAcademicYear = (state: StateSchema) => state.year.academicYear;
