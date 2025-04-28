import { getGridSingleSelectOperators } from '@mui/x-data-grid';

export const singleSelectOperators = getGridSingleSelectOperators()
    .filter((operator) => operator.value === 'isAnyOf')
    .map((operator) => ({
        ...operator,
        label: 'равно',
        requiresFilterValue: true,
    }));
