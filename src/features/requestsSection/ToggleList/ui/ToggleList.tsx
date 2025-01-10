import { memo, useCallback, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleButtons } from '@/shared/ui';
import { getRequestsSectionOption, getRequestsSectionOptions } from '@/widgets/RequestsSection';
import { requestsSectionActions } from '@/widgets/RequestsSection/model/slice/requestsSectionSlice';

export const ToggleList = memo(() => {
    const value = useSelector(getRequestsSectionOption);
    const dispatch = useAppDispatch();
    const options = useSelector(getRequestsSectionOptions);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof value) => {
            if (newAlignment) {
                dispatch(requestsSectionActions.setOption(newAlignment));
            }
        },
        [dispatch],
    );
    return (
        <ToggleButtons
            exclusive
            onChange={handleChange}
            value={value}
            options={options}
            sx={{ alignSelf: 'flex-start' }}
            variant="underline"
        />
    );
});
