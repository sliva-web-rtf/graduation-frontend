import { useSelector } from 'react-redux';
import { memo, MouseEvent, useCallback } from 'react';
import { ToggleButtons } from '@/shared/ui';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { getStudentInfoOption, getStudentInfoOptions, studentInfoActions } from '@/widgets/StudentInfo';

export const ToggleStudentInfo = memo(() => {
    const dispatch = useAppDispatch();
    const option = useSelector(getStudentInfoOption);
    const options = useSelector(getStudentInfoOptions);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof option) => {
            if (newAlignment) {
                dispatch(studentInfoActions.setOption(newAlignment));
            }
        },
        [dispatch],
    );

    return <ToggleButtons exclusive value={option} options={Object.values(options)} onChange={handleChange} />;
});
