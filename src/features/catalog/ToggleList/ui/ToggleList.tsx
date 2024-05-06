import { memo, MouseEvent, useCallback } from 'react';
import { ToggleButtons } from 'shared/ui/ToggleButtons/ToggleButtons';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { catalogActions } from 'widgets/Catalog/model/slice/catalogSlice';
import { useSelector } from 'react-redux';
import { getCatalogOption, getCatalogOptions } from 'widgets/Catalog';

export const ToggleList = memo(() => {
    const value = useSelector(getCatalogOption);
    const dispatch = useAppDispatch();
    const options = useSelector(getCatalogOptions);

    const handleChange = useCallback(
        (_: MouseEvent<HTMLElement>, newAlignment: typeof value) => {
            if (newAlignment) {
                dispatch(catalogActions.setOption(newAlignment));
            }
        },
        [dispatch],
    );

    return <ToggleButtons exclusive onChange={handleChange} value={value} options={options} />;
});
