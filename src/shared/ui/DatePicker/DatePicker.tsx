import { styled } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/ru';

const russianLocale = ruRU.components.MuiLocalizationProvider.defaultProps.localeText;
const StyledDatePicker = styled(DatePicker)(({ theme }) => ({
    '& .MuiInputBase-root': {
        borderRadius: theme.spacing(2),
        backgroundColor: theme.palette.background.paper,
        fontWeight: 500,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1e88e5 !important',
    },
    '&:hover .Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.error.main} !important`,
    },
    '&:hover .Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.error.main} !important`,
    },
}));

export const BaseDatePicker = (props: any) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru" localeText={russianLocale}>
            <StyledDatePicker {...props} />
        </LocalizationProvider>
    );
};
