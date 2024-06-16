import { ProfessorPersonalInfoFormSchema } from './professorInfoFormSchema';
import { ProfessorScientificFormSchema } from './professorScientificFormSchema';
import { ProfessorSearchingStatus } from './professorStatus';

export interface ProfessorProfile {
    personalInfo: ProfessorPersonalInfoFormSchema;
    scientificPorfolio?: ProfessorScientificFormSchema;
    professorStatus?: ProfessorSearchingStatus;
}
