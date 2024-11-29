import { ProfessorScientificFormSchema } from './professorScientificFormSchema';
import { StudentScientificFormSchema } from './studentScientificFormSchema';

export interface ScientificPortfolioSchema {
    professorScientificInfo?: ProfessorScientificFormSchema;
    studentScientificInfo?: StudentScientificFormSchema;
}
