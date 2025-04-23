import { CommissionNamesDto, CommissionNamesModel, CommissionsDto, CommissionsModel } from '../model';

export const mapCommissionNamesDtoToModel = (dto: CommissionNamesDto): CommissionNamesModel =>
    dto.commissions.map((item) => ({
        label: `${item.name} (${item.secretaryName})`,
        value: item.name,
    }));

export const mapCommissionsDtoToModel = (dto: CommissionsDto): CommissionsModel =>
    dto.commissions.map((item) => ({
        id: item.id,
        number: item.number,
        name: item.name,
        secretaryName: item.secretaryName,
    }));
