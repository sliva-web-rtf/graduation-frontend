import { PersonalInfoFormSchema } from './personalInfoFormSchema';
import { ScientificFormSchema } from './scientificFormSchema';
import { StudentSearchingStatus } from './studentStatus';

export interface StudentProfile {
    personalInfo: PersonalInfoFormSchema;
    scientificPorfolio?: ScientificFormSchema;
    StudentStatus?: StudentSearchingStatus;
}
