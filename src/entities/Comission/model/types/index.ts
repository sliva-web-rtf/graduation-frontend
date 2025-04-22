export type CommissionModel = {
    id: string;
    number: number;
    name: string;
    secretary: string;
};

export type CommissionRequest = {
    id: 'string';
};
export type CommissionNamesDto = {
    commissions: { name: string }[];
};
export type CommissionNamesModel = string[];

export type CommissionsDto = {
    commissions: CommissionModel[];
};
export type CommissionsModel = CommissionsDto['commissions'];
