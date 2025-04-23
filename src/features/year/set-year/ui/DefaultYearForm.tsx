import { getAcademicYear, YearSelect } from '@/entities/Year';
import { useSnackbar } from '@/shared/lib/hooks/useSnackbar';
import { BaseButton } from '@/shared/ui';
import SaveIcon from '@mui/icons-material/Save';
import { SelectChangeEvent, Stack } from '@mui/material';
import { memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { DefaultYearConfirmModal } from './DefaultYearConfirmModal';

export const DefaultYearForm = memo(() => {
    const [open, setOpen] = useState(false);
    const currentDefaultYear = useSelector(getAcademicYear);
    const [year, setYear] = useState<string>(currentDefaultYear);
    const { showSnackbar, Snackbar } = useSnackbar();

    const handleSetDefaultYear = () => {
        setOpen(true);
    };

    const handleClose = useCallback(() => {
        setOpen(false);
    }, []);

    const handleYearChange = (e: SelectChangeEvent<string>) => {
        setYear(e.target.value);
    };

    return (
        <Stack spacing={2}>
            <YearSelect
                useController={false}
                label="Учебный год по умолчанию"
                value={year}
                // @ts-expect-error Хак из-за максимальной универсальности селекта
                onChange={handleYearChange}
            />
            <BaseButton
                disabled={!year || year === currentDefaultYear}
                onClick={handleSetDefaultYear}
                variant="contained"
                sx={{ alignSelf: 'flex-start' }}
                startIcon={<SaveIcon />}
            >
                Сохранить
            </BaseButton>
            <DefaultYearConfirmModal open={open} onClose={handleClose} year={year} showSnackbar={showSnackbar} />
            {Snackbar}
        </Stack>
    );
});
