import { BaseSelect, BaseSelectProps } from '@/shared/ui';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useGetYearsQuery } from '../api';
import { getAcademicYear } from '../model';

type Props = Omit<BaseSelectProps, 'options'>;

export const YearSelect = memo((props: Props) => {
    const year = useSelector(getAcademicYear);
    const { isFetching, data } = useGetYearsQuery();

    const options = data ?? [year];

    return <BaseSelect disabled={isFetching} defaultValue={year} options={options} clearable={false} {...props} />;
});
