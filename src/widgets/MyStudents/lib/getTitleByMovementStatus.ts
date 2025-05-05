import { MovementStatus, MovementStatusRus } from '@/shared/lib/types/statuses';
import { StudentRowModel } from '../model';

const formatCommission = (name?: string, secretary?: string) => {
    if (!name) {
        return '';
    }

    return secretary ? `"${name}" (${secretary})` : `"${name}"`;
};

export const getTitleByMovementStatus = (value: StudentRowModel['commission']): string => {
    if (!value) return '';

    const { movementStatus, current, currentSecretary, prev, prevSecretary } = value;

    const action = MovementStatusRus[movementStatus] ?? '';

    const currentCommission = formatCommission(current, currentSecretary);
    const prevCommission = formatCommission(prev, prevSecretary);

    if (movementStatus === MovementStatus.Ingoing) {
        return [action, 'в', currentCommission, 'из', prevCommission].filter(Boolean).join(' ');
    }

    if (movementStatus === MovementStatus.Outgoing) {
        return [action, 'из', prevCommission, 'в', currentCommission].filter(Boolean).join(' ');
    }

    return current ?? '';
};
