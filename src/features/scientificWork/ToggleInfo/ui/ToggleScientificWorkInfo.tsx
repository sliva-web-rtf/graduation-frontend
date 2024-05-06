import { useSelector } from 'react-redux';
import { ToggleButtons } from 'shared/ui';
import { memo, MouseEvent, useCallback } from 'react';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import {
    getScientificWorkInfoOption,
    getScientificWorkInfoOptions,
    scientificWorkInfoActions,
} from 'widgets/ScientificWorkInfo';

export const ToggleScientificWorkInfo = memo(() => {
    const dispatch = useAppDispatch();
    const option = useSelector(getScientificWorkInfoOption);
    const options = useSelector(getScientificWorkInfoOptions);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof option) => {
            if (newAlignment) {
                dispatch(scientificWorkInfoActions.setOption(newAlignment));
            }
        },
        [dispatch],
    );

    return <ToggleButtons exclusive value={option} options={Object.values(options)} onChange={handleChange} />;
});
