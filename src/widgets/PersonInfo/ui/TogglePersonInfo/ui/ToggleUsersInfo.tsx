import { useSelector } from 'react-redux';
import { memo, MouseEvent, useCallback } from 'react';
import { ToggleButtons } from '@/shared/ui';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getPersonInfoOption, getPersonInfoOptions, personInfoActions } from '../../../model';

export const TogglePersonInfo = memo(() => {
    const dispatch = useAppDispatch();
    const option = useSelector(getPersonInfoOption);
    const options = useSelector(getPersonInfoOptions);

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
