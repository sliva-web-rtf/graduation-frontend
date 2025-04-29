import { Checkbox, CheckboxProps, FormControlLabel, Paper, Stack, Typography } from '@mui/material';
import { BaseChip } from '../Chip/Chip';

type Props = {
    value: string;
    label: string;
    description?: string | string[];
};

const renderDescription = (description?: string | string[]) => {
    if (!description) {
        return null;
    }

    if (Array.isArray(description)) {
        return (
            <Stack direction="row" spacing={1}>
                {description.map((desc, idx) => (
                    <BaseChip key={idx} label={desc} color={idx % 2 === 0 ? 'info' : 'warning'} size="small" />
                ))}
            </Stack>
        );
    }

    return <BaseChip label={description} color="warning" size="small" />;
};

export const BaseCheckbox = (props: Props & CheckboxProps) => {
    const { value, label, description, ...checkboxProps } = props;

    return (
        <Paper sx={(theme) => ({ padding: [theme.spacing(0.3), theme.spacing(2)].join(' '), borderRadius: 3 })}>
            <FormControlLabel
                label={
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography fontWeight={600}>{label}</Typography>
                        {renderDescription(description)}
                    </Stack>
                }
                value={value}
                control={<Checkbox {...checkboxProps} />}
            />
        </Paper>
    );
};
