import { StudentDto } from '@/entities/Student';
import { BaseCheckbox } from '@/shared/ui';
import { Paper, Stack } from '@mui/material';
import { ChangeEvent, memo, useCallback } from 'react';
import { CommissionChangePayload } from '../lib';
import { StudentTransferModal } from './StudentTransferModal';

type CheckboxItemProps = {
    label: string;
    value: string;
    checked: boolean;
    onChange: (_: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    onCommissionChange: (payload: CommissionChangePayload) => void;
    description?: string[];
    disabled?: boolean;
    currentCommissionName?: string | null;
    currentCommissionId: string | null;
};

const CheckboxItem = (props: CheckboxItemProps) => {
    const {
        label,
        value,
        checked,
        onChange,
        onCommissionChange,
        description,
        disabled,
        currentCommissionId,
        currentCommissionName,
    } = props;

    return (
        <Paper
            component={Stack}
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
            px={1}
            py={0.5}
        >
            <BaseCheckbox
                label={label}
                value={value}
                checked={checked}
                onChange={onChange}
                description={description}
                disabled={disabled}
            />
            {disabled && (
                <StudentTransferModal
                    studentName={label}
                    onCommissionChange={onCommissionChange}
                    currentCommissionId={currentCommissionId}
                    currentCommissionName={currentCommissionName}
                />
            )}
        </Paper>
    );
};

type StudentCheckboxProps = {
    student: StudentDto;
    isChecked: boolean;
    isDefaultChecked: boolean;
    onCheckChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onCommissionChange: (payload: CommissionChangePayload) => void;
    currentCommissionId: string | null;
    currentCommissionName?: string | null;
};

export const StudentCheckbox = memo((props: StudentCheckboxProps) => {
    const {
        student,
        isChecked,
        isDefaultChecked,
        onCheckChange,
        onCommissionChange,
        currentCommissionId,
        currentCommissionName,
    } = props;
    const description = [student.academicGroup?.name, student.commission?.name].filter(Boolean);

    const handleCommissionChange = useCallback(
        (payload: CommissionChangePayload) => onCommissionChange(payload),
        [onCommissionChange],
    );

    return (
        <CheckboxItem
            key={student.id}
            label={student.fullName}
            description={description}
            value={student.id}
            onChange={onCheckChange}
            onCommissionChange={handleCommissionChange}
            checked={isChecked}
            disabled={isDefaultChecked}
            currentCommissionId={currentCommissionId}
            currentCommissionName={currentCommissionName}
        />
    );
});
