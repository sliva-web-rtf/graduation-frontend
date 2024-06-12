import { PersonalInfoFormSchema } from './personalInfoFormSchema';
import { ScientificFormSchema } from './scientificFormSchema';

export type OnboardingSchema = {
    updatedProfileInfo?: PersonalInfoFormSchema;
    studentScientificInfo?: ScientificFormSchema;
    isProfileLoading: boolean;
};
