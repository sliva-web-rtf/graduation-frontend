import { BaseSelect, BaseSelectProps } from '@/shared/ui';
import { useGetAcademicProgramsQuery } from '../../api';

type Props = Omit<BaseSelectProps, 'options'> & { useController?: boolean };

export const AcademicProgramsSelect = (props: Props) => {
    const { isFetching, data } = useGetAcademicProgramsQuery();

    return <BaseSelect disabled={isFetching} options={data ?? []} {...props} />;
};
