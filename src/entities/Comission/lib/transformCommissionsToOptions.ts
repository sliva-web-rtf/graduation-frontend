import { CommissionModel } from '../model';

const getComissionNameWithSecretary = (comission: CommissionModel) => {
    if (comission.secretaryName) {
        return `${comission.name} (${comission.secretaryName})`;
    }

    return comission.name;
};

export const transformCommissionsToOptions = (comissions?: CommissionModel[]) => {
    return (
        comissions?.map((comission) => ({
            label: getComissionNameWithSecretary(comission),
            value: comission.id,
        })) ?? []
    );
};
