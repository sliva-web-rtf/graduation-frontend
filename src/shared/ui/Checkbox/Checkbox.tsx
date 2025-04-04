import { Checkbox, CheckboxProps, FormControlLabel, Paper, Stack, Typography } from '@mui/material';

type Props = {
    value: string;
    label: string;
    description?: string;
};

export const BaseCheckbox = (props: Props & CheckboxProps) => {
    const { value, label, description, ...checkboxProps } = props;

    return (
        <Paper sx={(theme) => ({ padding: [theme.spacing(0.3), theme.spacing(2)].join(' '), borderRadius: 3 })}>
            <FormControlLabel
                label={
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Typography fontWeight={600}>{label}</Typography>
                        {description && <Typography color="secondary">{description}</Typography>}
                    </Stack>
                }
                value={value}
                control={<Checkbox {...checkboxProps} />}
            />
        </Paper>
    );
};
