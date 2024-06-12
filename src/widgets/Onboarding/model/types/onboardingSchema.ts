import { PersonalInfoFormSchema } from './personalInfoFormSchema';
import { ScientificFormSchema } from './scientificFormSchema';
import { StudentSearchingStatus } from './studentStatus';

export type OnboardingSchema = {
    updatedProfileInfo?: PersonalInfoFormSchema;
    studentScientificInfo?: ScientificFormSchema;
    studentStatus?: StudentSearchingStatus;
    isProfileLoading: boolean;
};
