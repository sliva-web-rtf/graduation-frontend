import { CommissionModel } from '../model';

export const transformCommissionsToOptions = (comissions?: CommissionModel[]) => {
    return (
        comissions?.map((comission) => ({
            label: comission.name,
            value: comission.id,
        })) ?? []
    );
};
