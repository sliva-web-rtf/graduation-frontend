import { PersonalInfoFormSchema } from './personalInfoFormSchema';
import { ProfessorSearchingStatus } from '@/widgets/Onboarding/model/types/professorStatus';
import { STATUS } from '@/shared/api/status';
import { StudentSearchingStatus } from './studentSearchingStatus';

export type PersonalDataSchema = {
    isProfileLoading: STATUS;

    studentUpdatedProfileInfo?: PersonalInfoFormSchema;
    professorUpdatedProfileInfo?: PersonalInfoFormSchema;
    studentSearchingStatus?: StudentSearchingStatus;
    professorSearhingStatus?: ProfessorSearchingStatus;
};
