import { memo, useCallback, MouseEvent } from 'react';
import { useSelector } from 'react-redux';
import { getProfileOption, getProfileOptions } from '@/widgets/Profile';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { profileActions } from '@/widgets/Profile/model/slice/profileSlice';
import { ToggleButtons } from '@/shared/ui';

export const ToggleList = memo(() => {
    const value = useSelector(getProfileOption);
    const dispatch = useAppDispatch();
    const options = useSelector(getProfileOptions);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof value) => {
            if (newAlignment) {
                dispatch(profileActions.setOption(newAlignment));
            }
        },
        [dispatch],
    );
    return <ToggleButtons exclusive onChange={handleChange} value={value} options={options} />;
});
