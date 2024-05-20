import { PersonalInfoFormSchemaDto } from '../api/types';
import { PersonalInfoFormSchema } from '../model/types/personalInfoFormSchema';

export function updateProfileToDto(model: PersonalInfoFormSchema): PersonalInfoFormSchemaDto {
    return {
        firstName: model.firstName,
        lastName: model.lastName,
        patronymic: model.middleName,
        email: model.email,
        contacts: model.contacts,
        phone: model.phone,
    };
}
