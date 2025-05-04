import { BaseCheckbox, BaseSwitch } from '@/shared/ui';
import { Paper, Stack } from '@mui/material';
import { ChangeEvent } from 'react';

type ExpertCheckboxProps = {
    label: string;
    value: string;
    checked: boolean;
    onChange: (_: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
    invited?: boolean;
    onSwitchChange: (_: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

export const ExpertCheckbox = (props: ExpertCheckboxProps) => {
    const { label, value, checked, onChange, onSwitchChange, invited } = props;

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
            <BaseCheckbox label={label} value={value} checked={checked} onChange={onChange} />
            {checked && <BaseSwitch label="Приглашенный" onChange={onSwitchChange} checked={invited} />}
        </Paper>
    );
};
