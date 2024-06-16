import { SearchingStatus } from '@/shared/lib/types/searchingStatus';

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

export type StudentStatusDto = {
    commandSearching: boolean;
    professorSearching: boolean;
    status: SearchingStatus;
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
    commandSearching: boolean;
    professorSearching: boolean;
    status: SearchingStatus;
};

export type ProfessorProfileDto = {
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
    phoneNumber: string;
    degree: string;
    workExperienceYears: number;
    scientificAreaSubsections: string[];
    scientificInterests: string[];
    about: string;
    urpUri: string;
    scopusUri: string;
    riscUri: string;
    post: string;
    address: string;
    limit: number;
    searchStatus: SearchingStatus;
};

export type ProfessorPersonalInfoFormSchemaDto = {
    firstName: string;
    lastName: string;
    patronymic: string;
    email: string;
    phone?: string;
};

export type ProfessorScientificInfoDto = {
    degree: string;
    workExperienceYears: number;
    scientificAreaSubsections: string[];
    scientificInterests: string[];
    about: string;
    urpUri: string;
    scopusUri: string;
    riscUri: string;
    post: string;
    address: string;
};

export type ProfessorStatusDto = {
    limit: number;
    searchStatus: SearchingStatus;
};
