type Expert = {
    name: string;
    isInvited?: boolean;
};

export type CommissionModel = {
    id: string;
    number: number;
    name: string;
    secretaryName: string;
    expertsNames: Expert[];
    chairpersonName: string;
    academicGroups: string[];
};

export type CommissionRequest = {
    id: string;
};
export type CommissionNamesDto = {
    commissions: Pick<CommissionModel, 'name' | 'secretaryName'>[];
};
export type CommissionNamesModel = {
    id: CommissionModel['id'];
    label: CommissionModel['name'];
    value: CommissionModel['name'];
}[];

export type CommissionsDto = {
    commissions: CommissionModel[];
};
export type CommissionsModel = CommissionsDto['commissions'];

export type CommissionDto = {
    name: string;
    secretary: {
        id: string;
        name: string;
    };
    chairperson: {
        id: string;
        name: string;
    };
    academicGroups: { id: string; name: string; academicProgram?: string }[];
    stages: {
        stage: string;
        experts: {
            id: string;
            name: string;
            isInvited: boolean;
        }[];
        movedStudents: { id: string; name: string; commissionId: string; commissionName: string }[];
    }[];
};
