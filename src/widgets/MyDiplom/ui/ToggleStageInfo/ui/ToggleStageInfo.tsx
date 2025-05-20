import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleButtons } from '@/shared/ui';
import { memo, MouseEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { diplomActions, getDiplom } from '../../../model';

export const ToggleStageInfo = memo(() => {
    const dispatch = useAppDispatch();
    const { stage, stages, stageOptions } = useSelector(getDiplom);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: string) => {
            if (newAlignment) {
                const newStage = stages.find((s) => s.name === newAlignment);
                if (newStage) {
                    dispatch(diplomActions.setStage(newStage));
                }
            }
        },
        [dispatch, stages],
    );

    return (
        <ToggleButtons
            exclusive
            value={stage.name}
            options={stageOptions}
            onChange={handleChange}
            sx={{ alignSelf: 'flex-start' }}
        />
    );
});
