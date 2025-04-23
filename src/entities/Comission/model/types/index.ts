export type CommissionModel = {
    id: string;
    number: number;
    name: string;
    secretaryName: string;
};

export type CommissionRequest = {
    id: 'string';
};
export type CommissionNamesDto = {
    commissions: Pick<CommissionModel, 'name' | 'secretaryName'>[];
};
export type CommissionNamesModel = { label: CommissionModel['name']; value: CommissionModel['name'] }[];

export type CommissionsDto = {
    commissions: CommissionModel[];
};
export type CommissionsModel = CommissionsDto['commissions'];
