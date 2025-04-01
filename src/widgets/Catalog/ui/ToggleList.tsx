import { memo, MouseEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleButtons } from '@/shared/ui/ToggleButtons/ToggleButtons';
import { catalogActions } from '@/widgets/Catalog/model/slice/catalogSlice';
import { getCatalog } from '../model';

export const ToggleList = memo(() => {
    const dispatch = useAppDispatch();
    const { option, options } = useSelector(getCatalog);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof option) => {
            if (newAlignment) {
                dispatch(catalogActions.setOption(newAlignment));
                dispatch(catalogActions.setPage(1));
            }
        },
        [dispatch],
    );

    return <ToggleButtons exclusive onChange={handleChange} value={option} options={options} />;
});
