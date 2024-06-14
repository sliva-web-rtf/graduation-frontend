import { STATUS } from '@/shared/api/status';
import { PersonalInfoFormSchema } from './personalInfoFormSchema';
import { ScientificFormSchema } from './scientificFormSchema';
import { StudentSearchingStatus } from './studentStatus';
import { ProfessorPersonalInfoFormSchema } from './professorInfoFormSchema';

export type OnboardingSchema = {
    updatedProfileInfo?: PersonalInfoFormSchema;
    studentScientificInfo?: ScientificFormSchema;
    studentStatus?: StudentSearchingStatus;
    updatedProfessorProfileInfo?: ProfessorPersonalInfoFormSchema;
    isProfileLoading: STATUS;
};
