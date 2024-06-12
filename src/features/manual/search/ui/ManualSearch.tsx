import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { BaseField } from '@/shared/ui';

export const ManualSearch = () => {
    const a = 'a';

    return (
        <BaseField
            variant="standard"
            placeholder="Поиск"
            sx={(theme) => ({
                width: '300px',
                '& .MuiInputBase-root': {
                    padding: [theme.spacing(1), theme.spacing(2)].join(' '),
                },
            })}
            InputProps={{
                disableUnderline: true,
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
        />
    );
};
