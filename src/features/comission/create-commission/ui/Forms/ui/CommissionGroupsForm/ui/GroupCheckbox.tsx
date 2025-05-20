import { SetFormattingReviewerModal } from '@/features/setFormattingReviewer';
import { BaseCheckbox } from '@/shared/ui';
import { Paper, Stack } from '@mui/material';
import { ChangeEvent } from 'react';

type GroupCheckboxProps = {
    label: string;
    checked: boolean;
    onChange: (_: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    value: string;

    formattingReviewerId?: string | null;
    formattingReviewerName?: string | null;
    description?: string[];
    disabled?: boolean;
};

export const GroupCheckbox = (props: GroupCheckboxProps) => {
    const { label, value, checked, onChange, description, disabled, formattingReviewerId, formattingReviewerName } =
        props;

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
            <SetFormattingReviewerModal
                academicGroupId={value}
                academicGroupName={label}
                formattingReviewerId={formattingReviewerId}
                formattingReviewerName={formattingReviewerName}
            />
        </Paper>
    );
};
