/* eslint-disable react/prop-types */
import { Typography } from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import { FieldError } from 'react-hook-form';

interface HelperTextProps {
    error?: FieldError;
}
export const HelperText: React.FC<HelperTextProps> = ({ error }) =>
    error && (
        <Typography display="flex" alignItems="center" variant="bodyXS" gap={0.5}>
            <CancelIcon fontSize="inherit" />
            {error.message}
        </Typography>
    );

export default HelperText;
