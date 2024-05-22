import { WorkStatus } from 'entities/ScientificWork';

export const getChipColorByWorkStatus = (status: WorkStatus): string => {
    switch (status) {
        case WorkStatus.NotConfirmed:
            return 'secondary.light';
        case WorkStatus.Confirmed:
            return 'success.light';
        default:
            return 'primary.light';
    }
};
