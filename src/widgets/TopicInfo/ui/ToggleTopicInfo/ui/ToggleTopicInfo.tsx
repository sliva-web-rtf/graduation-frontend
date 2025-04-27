import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleButtons } from '@/shared/ui';
import { memo, MouseEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getTopicInfo, topicInfoActions } from '../../../model';

export const ToggleTopicInfo = memo(() => {
    const dispatch = useAppDispatch();
    const { option, options } = useSelector(getTopicInfo);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof option) => {
            if (newAlignment) {
                dispatch(topicInfoActions.setOption(newAlignment));
            }
        },
        [dispatch],
    );

    return (
        <ToggleButtons exclusive size="small" value={option} options={Object.values(options)} onChange={handleChange} />
    );
});
