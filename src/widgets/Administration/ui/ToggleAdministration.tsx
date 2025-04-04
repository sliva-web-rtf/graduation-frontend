import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleButtons } from '@/shared/ui';
import { memo, MouseEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { administrationActions, getAdministrationData } from '../model';

export const ToggleAdministration = memo(() => {
    const dispatch = useAppDispatch();
    const { option, options } = useSelector(getAdministrationData);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof option) => {
            if (newAlignment) {
                dispatch(administrationActions.setOption(newAlignment));
            }
        },
        [dispatch],
    );

    return (
        <ToggleButtons
            exclusive
            value={option}
            options={options}
            onChange={handleChange}
            sx={{ alignSelf: 'flex-start' }}
        />
    );
});
