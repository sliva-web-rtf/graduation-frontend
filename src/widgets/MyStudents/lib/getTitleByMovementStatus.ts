import { MovementStatus, MovementStatusRus } from '@/shared/lib/types/statuses';
import { StudentRowModel } from '../model';

export const getTitleByMovementStatus = (value: StudentRowModel['commission']): string => {
    if (!value) return '';

    const { movementStatus, current, prev } = value;

    const action = MovementStatusRus[movementStatus] ?? '';

    const wrap = (name?: string) => (name ? `"${name}"` : '');

    if (movementStatus === MovementStatus.Ingoing) {
        return [action, 'в', wrap(current), 'из', wrap(prev)].filter(Boolean).join(' ');
    }

    if (movementStatus === MovementStatus.Outgoing) {
        return [action, 'из', wrap(prev), 'в', wrap(current)].filter(Boolean).join(' ');
    }

    return current ?? '';
};
