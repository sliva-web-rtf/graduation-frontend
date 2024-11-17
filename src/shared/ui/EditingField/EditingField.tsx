import { InputAdornment, styled, TextField, TextFieldProps } from '@mui/material';
import { EditOutlinedIcon } from '@/shared/assets/icons/EditOutlinedIcon';

export const EditingField = styled((props: TextFieldProps) => (
    <TextField
        {...props}
        variant="standard"
        InputLabelProps={{ shrink: true }}
        InputProps={{
            ...props.InputProps,
            endAdornment: (
                <InputAdornment position="end">
                    <EditOutlinedIcon />
                </InputAdornment>
            ),
        }}
        sx={{
            '& .MuiInput-underline:before': {
                borderBottomColor: '#E6EDF5',
            },
            '& .MuiInput-underline:after': {
                borderBottomColor: '#E6EDF5',
            },
        }}
    />
))(() => ({}));
