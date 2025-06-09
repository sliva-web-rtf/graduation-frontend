import { InputAdornment, styled } from '@mui/material';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/ru';

type BaseDatePickerProps = DatePickerProps<any, any> & {
    startAdornment?: string;
};

const russianLocale = ruRU.components.MuiLocalizationProvider.defaultProps.localeText;
const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
    '& .MuiInputBase-root::before, & .MuiInputBase-root::after': {
        display: 'none',
    },
    '& .MuiFilledInput-root': {
        overflow: 'hidden',
        borderRadius: theme.spacing(1),
        border: '1px solid',
        backgroundColor: theme.palette.background.paper,
        borderColor: theme.palette.grey[300],
        '&:hover': {
            borderColor: '#1e88e5',
            backgroundColor: theme.palette.background.paper,
        },

        '&.Mui-error': {
            borderColor: theme.palette.error.main,
        },

        '&.Mui-focused': {
            backgroundColor: theme.palette.background.paper,
        },

        '&.Mui-disabled': {
            backgroundColor: theme.palette.secondary.light,
        },
    },
}));

export const BaseDatePicker = ({ startAdornment, slotProps, ...props }: BaseDatePickerProps) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru" localeText={russianLocale}>
            <StyledDatePicker
                slotProps={{
                    field: { clearable: true },
                    textField: {
                        InputProps: {
                            startAdornment: <InputAdornment position="start">{startAdornment}</InputAdornment>,
                        },
                    },
                    ...slotProps,
                }}
                {...props}
            />
        </LocalizationProvider>
    );
};
