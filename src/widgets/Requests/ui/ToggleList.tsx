import { memo, MouseEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleButtons } from '@/shared/ui';
import { getRequestsSection, requestsSectionActions } from '../model';

export const ToggleList = memo(() => {
    const dispatch = useAppDispatch();
    const { option, options } = useSelector(getRequestsSection);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof option) => {
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
            value={option}
            options={options}
            sx={{ alignSelf: 'flex-start' }}
        />
    );
});
