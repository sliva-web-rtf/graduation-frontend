import { useSelector } from 'react-redux';
import { memo, MouseEvent, useCallback } from 'react';
import { ToggleButtons } from '@/shared/ui';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getProfessorInfoOption, getProfessorInfoOptions, professorInfoActions } from '@/widgets/ProfessorInfo';

export const ToggleProfessorInfo = memo(() => {
    const dispatch = useAppDispatch();
    const option = useSelector(getProfessorInfoOption);
    const options = useSelector(getProfessorInfoOptions);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof option) => {
            if (newAlignment) {
                dispatch(professorInfoActions.setOption(newAlignment));
            }
        },
        [dispatch],
    );

    return <ToggleButtons exclusive value={option} options={Object.values(options)} onChange={handleChange} />;
});
