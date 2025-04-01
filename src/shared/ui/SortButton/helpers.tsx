/* eslint-disable no-nested-ternary */
import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
import { SortDirection } from '@/shared/lib/const';

export const getSortConfig = (order: SortDirection) => {
    const fontSize = 'inherit';

    return {
        isDefault: order === SortDirection.DEFAULT,
        tooltipTitle:
            order === SortDirection.ASC
                ? 'Сортировать по возрастанию'
                : order === SortDirection.DESC
                  ? 'Сортировать по убыванию'
                  : 'Сортировка выключена',
        nextOrder:
            order === SortDirection.DEFAULT
                ? SortDirection.ASC
                : order === SortDirection.ASC
                  ? SortDirection.DESC
                  : SortDirection.DEFAULT,
        icon:
            order === SortDirection.ASC ? (
                <ArrowUpward fontSize={fontSize} color="primary" />
            ) : order === SortDirection.DESC ? (
                <ArrowDownward fontSize={fontSize} color="primary" />
            ) : (
                <SwapVert fontSize={fontSize} />
            ),
    };
};
