import { memo, MouseEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleButtons } from '@/shared/ui';
import { getProfile } from '@/widgets/Profile';
import { profileActions } from '@/widgets/Profile/model/slice/profileSlice';

export const ToggleList = memo(() => {
    const dispatch = useAppDispatch();
    const { option, options } = useSelector(getProfile);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof option) => {
            if (newAlignment) {
                dispatch(profileActions.setOption(newAlignment));
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
