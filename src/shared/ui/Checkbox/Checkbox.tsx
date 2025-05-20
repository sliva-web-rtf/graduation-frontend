import { Checkbox, CheckboxProps, FormControlLabel, Stack, Typography } from '@mui/material';
import { BaseChip } from '../Chip/Chip';

type Props = {
    label: string;

    description?: string | string[];
    value?: string;
    styled?: boolean;
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
        <Stack direction="row" spacing={2} alignItems="center" flexWrap="nowrap">
            <FormControlLabel
                label={
                    <Typography fontWeight={600} whiteSpace="nowrap">
                        {label}
                    </Typography>
                }
                value={value}
                control={<Checkbox {...checkboxProps} />}
            />
            {renderDescription(description)}
        </Stack>
    );
};
