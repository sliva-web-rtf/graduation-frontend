import { ComissionSelect } from '@/entities/Comission';
import { StageSelect } from '@/entities/Stage';
import { isUserHeadSecretary } from '@/entities/User';
import { DEBOUNCE_DELAY } from '@/shared/lib/const';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { BaseSearch } from '@/shared/ui';
import { Box, SelectChangeEvent, Stack } from '@mui/material';
import { ChangeEvent, memo, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDebouncedCallback } from 'use-debounce';
import { myStudentsActions } from '../model';
import { getMyStudentsState } from '../model/selectors';

export const MyStudentsFilter = memo(() => {
    const dispatch = useAppDispatch();
    const isHeadSecretary = useSelector(isUserHeadSecretary);
    const { stage, query, commissions } = useSelector(getMyStudentsState);
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

    return (
        <Stack direction="row" spacing={3}>
            <Box flex={1}>
                <BaseSearch placeholder="Поиск по ФИО, группе или теме" value={searchValue} onChange={onChangeSearch} />
            </Box>
            <Stack direction="row" spacing={3} flex={isHeadSecretary ? 2 : 1}>
                <Box flex={1}>
                    <StageSelect
                        value={stage}
                        // @ts-expect-error Хак из-за максимальной универсальности селекта
                        onChange={onChangeStage}
                    />
                </Box>
                {isHeadSecretary && (
                    <Box flex={1}>
                        <ComissionSelect
                            value={commissions}
                            // @ts-expect-error Хак из-за максимальной универсальности селекта
                            onChange={onChangeComission}
                        />
                    </Box>
                )}
            </Stack>
        </Stack>
    );
});
