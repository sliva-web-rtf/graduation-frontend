export type PersonalInfoFormSchemaDto = {
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
    contacts?: string;
    phone?: string;
};

export type StudentScientificInfoDto = {
    degree: string;
    year: number;
    scientificAreaSubsections: string[];
    scientificInterests: string[];
    about: string;
};

export type StudentProfileDto = {
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
    contacts: string;
    phoneNumber: string;
    degree: string;
    year: number;
    scientificAreaSubsections: string[];
    scientificInterests: string[];
    about: string;
};
