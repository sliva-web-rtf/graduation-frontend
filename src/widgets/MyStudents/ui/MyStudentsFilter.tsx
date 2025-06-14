import { ComissionNameSelect } from '@/entities/Comission';
import { StageSelect } from '@/entities/Stage';
import { isUserHeadSecretary } from '@/entities/User';
import { DEBOUNCE_DELAY } from '@/shared/lib/const';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseDatePicker, BaseSearch } from '@/shared/ui';
import { Box, SelectChangeEvent, Stack } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { myStudentsActions } from '../model';
import { getMyStudentsState } from '../model/selectors';

export const MyStudentsFilter = memo(() => {
    const dispatch = useAppDispatch();
    const isHeadSecretary = useSelector(isUserHeadSecretary);
    const { stage, query, commissions, fromDate, toDate } = useSelector(getMyStudentsState);
    const [searchValue, setSearchValue] = useState(query);

    const handleSearchChange = useDebouncedCallback((value: string) => {
        dispatch(myStudentsActions.setQuery(value));
    }, DEBOUNCE_DELAY);

    const onChangeSearch = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        handleSearchChange(e.target.value);
    };

    const onChangeStage = useCallback(
        (e: SelectChangeEvent<string>) => {
            dispatch(myStudentsActions.setStage(e.target.value));
        },
        [dispatch],
    );

    const onChangeComission = useCallback(
        (e: SelectChangeEvent<string[]>) => {
            // @ts-expect-error Хак из-за максимальной универсальности селекта
            dispatch(myStudentsActions.setCommissions(e.target.value));
        },
        [dispatch],
    );

    const handleDateChange = useCallback((newValue: Date | null, action: (date: Dayjs | null) => void) => {
        if (!newValue) {
            action(null);
            return;
        }

        const date = dayjs(newValue);
        if (date.isValid()) {
            action(date);
        }
    }, []);

    const onChangeFromDate = useCallback(
        (newValue: Date | null) => {
            handleDateChange(newValue, (date) => dispatch(myStudentsActions.setFromDate(date)));
        },
        [dispatch, handleDateChange],
    );

    const onChangeToDate = useCallback(
        (newValue: Date | null) => {
            handleDateChange(newValue, (date) => dispatch(myStudentsActions.setToDate(date)));
        },
        [dispatch, handleDateChange],
    );

    return (
        <Stack spacing={1}>
            <Stack direction="row" spacing={2}>
                <Box flex={1}>
                    <BaseSearch
                        label="Поиск по ФИО, группе, теме или руководителю"
                        placeholder="Например: Иванов РИ-410940"
                        value={searchValue}
                        onChange={onChangeSearch}
                    />
                </Box>
                <Box flex={1}>
                    <StageSelect
                        value={stage}
                        // @ts-expect-error Хак из-за максимальной универсальности селекта
                        onChange={onChangeStage}
                    />
                </Box>
                {isHeadSecretary && (
                    <Box flex={1}>
                        <ComissionNameSelect
                            value={commissions}
                            // @ts-expect-error Хак из-за максимальной универсальности селекта
                            onChange={onChangeComission}
                        />
                    </Box>
                )}
            </Stack>
            <Stack direction="row" spacing={2}>
                <Stack flex={1} direction="row" spacing={1} minWidth={420}>
                    <BaseDatePicker
                        label="Дата защиты"
                        startAdornment="с"
                        value={fromDate}
                        onChange={onChangeFromDate}
                    />
                    <BaseDatePicker
                        label="Дата защиты"
                        startAdornment="до"
                        minDate={fromDate}
                        value={toDate}
                        onChange={onChangeToDate}
                    />
                </Stack>
                <Box flex={1} />
                <Box flex={1} />
            </Stack>
        </Stack>
    );
});
