import { PersonalInfoFormSchema } from './personalInfoFormSchema';
import { STATUS } from '@/shared/api/status';
import { StudentSearchingStatus } from './studentSearchingStatus';

export type PersonalDataSchema = {
    isProfileLoading: STATUS;

    studentUpdatedProfileInfo?: PersonalInfoFormSchema;
    professorUpdatedProfileInfo?: PersonalInfoFormSchema;
    studentSearchingStatus?: StudentSearchingStatus;
};
