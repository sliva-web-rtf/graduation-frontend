import { StudentSearchingStatus } from '@/widgets/Onboarding/model/types/studentStatus';
import { PersonalInfoFormSchema } from './personalInfoFormSchema';
import { ProfessorSearchingStatus } from '@/widgets/Onboarding/model/types/professorStatus';
import { STATUS } from '@/shared/api/status';

export type PersonalDataSchema = {
    isProfileLoading: STATUS;

    studentUpdatedProfileInfo?: PersonalInfoFormSchema;
    professorUpdatedProfileInfo?: PersonalInfoFormSchema;
    studentSearchingStatus?: StudentSearchingStatus;
    professorSearhingStatus?: ProfessorSearchingStatus;
};
