import { styled } from '@mui/material';
import { TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ruRU } from '@mui/x-date-pickers/locales';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import 'dayjs/locale/ru';

const russianLocale = ruRU.components.MuiLocalizationProvider.defaultProps.localeText;
const StyledTimeFieldr = styled(TimeField)(({ theme }) => ({
    '& .MuiInputBase-root': {
        borderRadius: 0,
        backgroundColor: theme.palette.background.paper,
        fontWeight: 500,
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 0,
        borderColor: '#1e88e5 !important',
    },
    '&:hover .Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.error.main} !important`,
    },
    '&:hover .Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.error.main} !important`,
    },
}));

export const BaseTimeField = (props: any) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="ru" localeText={russianLocale}>
            <StyledTimeFieldr {...props} />
        </LocalizationProvider>
    );
};
