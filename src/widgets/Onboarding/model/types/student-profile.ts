import { PersonalInfoFormSchema } from './personalInfoFormSchema';
import { ScientificFormSchema } from './scientificFormSchema';

export interface StudentProfile {
    personalInfo: PersonalInfoFormSchema;
    scientificPorfolio?: ScientificFormSchema;
}
