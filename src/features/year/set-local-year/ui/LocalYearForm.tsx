import { getAcademicYear, yearActions, YearSelect } from '@/entities/Year';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { SelectChangeEvent } from '@mui/material';
import { memo } from 'react';
import { useSelector } from 'react-redux';

export const LocalYearForm = memo(() => {
    const dispatch = useAppDispatch();
    const year = useSelector(getAcademicYear);

    const handleYearChange = (e: SelectChangeEvent<string>) => {
        dispatch(yearActions.setAcademicYear(e.target.value));
    };

    return (
        <YearSelect
            useController={false}
            value={year}
            label="Учебный год"
            // @ts-expect-error Хак из-за максимальной универсальности селекта
            onChange={handleYearChange}
        />
    );
});
