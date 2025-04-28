import { GridFilterModel } from '@mui/x-data-grid';

type FilterQuery = Record<string, string | string[]>;

export function buildFilterQuery(filter: GridFilterModel): FilterQuery {
    const params: FilterQuery = {};

    filter.items.forEach((item) => {
        if (item.value === undefined || item.value === null || item.value.length === 0) {
            return;
        }

        const key = item.field;
        const { value } = item;

        params[key] = value;
    });

    return params;
}
