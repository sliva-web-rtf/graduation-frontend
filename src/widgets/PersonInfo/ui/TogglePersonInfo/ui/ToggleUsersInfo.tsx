import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleButtons } from '@/shared/ui';
import { memo, MouseEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getPersonInfo, personInfoActions } from '../../../model';

export const TogglePersonInfo = memo(() => {
    const dispatch = useAppDispatch();
    const { option, options } = useSelector(getPersonInfo);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof option) => {
            if (newAlignment) {
                dispatch(personInfoActions.setOption(newAlignment));
            }
        },
        [dispatch],
    );

    return <ToggleButtons exclusive value={option} options={Object.values(options)} onChange={handleChange} />;
});
