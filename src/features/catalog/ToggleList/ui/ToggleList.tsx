import { memo, MouseEvent, useCallback } from 'react';
import { ToggleButtons } from 'shared/ui/ToggleButtons/ToggleButtons';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { catalogActions } from 'widgets/Catalog/model/slice/catalogSlice';
import { useSelector } from 'react-redux';
import { getCatalogOptions } from 'widgets/Catalog';
import { CatalogOptions } from 'shared/lib/types/options';

interface ToggleListProps {
    readonly value: CatalogOptions;
}

export const ToggleList = memo((props: ToggleListProps) => {
    const { value } = props;
    const dispatch = useAppDispatch();
    const options = useSelector(getCatalogOptions);

    const handleChange = useCallback(
        (event: MouseEvent<HTMLElement>, newAlignment: CatalogOptions) => {
            if (newAlignment) {
                dispatch(catalogActions.setOption(newAlignment));
            }
        },
        [dispatch],
    );

    return <ToggleButtons color="primary" exclusive onChange={handleChange} value={value} options={options} />;
});
