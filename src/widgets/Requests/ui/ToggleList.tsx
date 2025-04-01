import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleButtons } from '@/shared/ui';
import { memo, MouseEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getRequestsSection, requestsActions } from '../model';

export const ToggleList = memo(() => {
    const dispatch = useAppDispatch();
    const { option, options } = useSelector(getRequestsSection);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof option) => {
            if (newAlignment) {
                dispatch(requestsActions.setOption(newAlignment));
            }
        },
        [dispatch],
    );
    return (
        <ToggleButtons
            exclusive
            onChange={handleChange}
            value={option}
            options={options}
            sx={{ alignSelf: 'flex-start' }}
        />
    );
});
