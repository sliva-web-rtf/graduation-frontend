import { useSelector } from 'react-redux';
import { memo, useCallback, MouseEvent } from 'react';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { ToggleButtons } from '@/shared/ui';
import { getCatalogOption, getCatalogOptions } from '@/widgets/Catalog';
import { catalogActions } from '@/widgets/Catalog/model/slice/catalogSlice';

export const ToggleList = memo(() => {
    const value = useSelector(getCatalogOption);
    const dispatch = useAppDispatch();
    const options = useSelector(getCatalogOptions);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof value) => {
            if (newAlignment) {
                dispatch(catalogActions.setOption(newAlignment));
                dispatch(catalogActions.setPage(1));
            }
        },
        [dispatch],
    );

    return <ToggleButtons exclusive onChange={handleChange} value={value} options={options} variant="underline" />;
});
