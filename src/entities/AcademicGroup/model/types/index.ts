export type AcademicGroup = {
    id: string;
    name: string;
    academicProgram: string;
    blocked: boolean;
};

export type AcademicGroupsDto = {
    academicGroups: AcademicGroup[];
    pagesCount: number;
};

export type AcademicGroupsRequest = {
    page: number;
    size: number;
    query: string;

    commissionId?: string | null;
};
