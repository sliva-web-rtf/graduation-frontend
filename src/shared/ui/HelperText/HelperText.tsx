import CancelIcon from '@mui/icons-material/Cancel';
import { Typography } from '@mui/material';
import { FieldError } from 'react-hook-form';

interface HelperTextProps {
    error?: FieldError;
}

export const HelperText = (props: HelperTextProps) => {
    const { error } = props;

    if (!error) {
        return null;
    }

    return (
        <Typography display="flex" alignItems="center" variant="bodyXS" gap={0.5}>
            <CancelIcon fontSize="inherit" />
            {error.message}
        </Typography>
    );
};
