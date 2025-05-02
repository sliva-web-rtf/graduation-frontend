import { useGetStudentsQuery } from '@/entities/Student';
import { BasePagination, EmptyMessage } from '@/shared/ui';
import { BaseCheckboxSkeletonList } from '@/shared/ui/Checkbox/Checkbox.skeleton';
import { FormControl, Stack } from '@mui/material';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { StudentsFormSchema } from '../../../../../model';
import { fromSelectedGroup, getStudentCommissionChangeHandler, getStudentsChangeHandler } from '../lib';
import { StudentCheckbox } from './StudentCheckbox';

type CommissionStudentsListProps = {
    stage: string;
    control: Control<StudentsFormSchema>;
    query: string;

    academicGroups?: string[];
};

const size = 10;
const defaultPage = 0;

export const CommissionStudentsList = memo((props: CommissionStudentsListProps) => {
    const { stage, control, query, academicGroups } = props;
    const [page, setPage] = useState(defaultPage);

    const { data, isFetching } = useGetStudentsQuery({
        query,
        size,
        page,
        stage,
        sortByAcademicGroups: academicGroups,
    });

    const handleChangePage = useCallback((_: ChangeEvent<unknown>, value: number) => {
        setPage(value - 1);
    }, []);

    const createStudentChangeHandler = useCallback(getStudentsChangeHandler, []);
    const createCommissionChangeHandler = useCallback(getStudentCommissionChangeHandler, []);

    useEffect(() => {
        setPage(defaultPage);
    }, [query]);

    if (isFetching) {
        return <BaseCheckboxSkeletonList count={size} />;
    }

    if (!data?.students?.length) {
        return <EmptyMessage />;
    }

    return (
        <Stack spacing={4} height="100%" justifyContent="space-between">
            <FormControl>
                <Controller
                    key={stage}
                    name={stage}
                    control={control}
                    render={({ field }) => {
                        const handleCommissionChange = createCommissionChangeHandler(field);
                        const handleStudentChange = createStudentChangeHandler(field);

                        return (
                            <Stack spacing={1}>
                                {data.students.map((item) => {
                                    const defaultChecked = fromSelectedGroup(item, academicGroups);
                                    const currentCommissionId =
                                        field.value?.find((student) => student.id === item.id)?.commissionId ?? null;
                                    const checked =
                                        !currentCommissionId &&
                                        (field.value?.some((student) => student.id === item.id) || defaultChecked);

                                    return (
                                        <StudentCheckbox
                                            key={item.id}
                                            student={item}
                                            isChecked={checked}
                                            isDefaultChecked={defaultChecked}
                                            onCheckChange={handleStudentChange(item.id)}
                                            onCommissionChange={handleCommissionChange(item.id)}
                                            currentCommissionId={currentCommissionId}
                                        />
                                    );
                                })}
                            </Stack>
                        );
                    }}
                />
            </FormControl>
            <BasePagination page={page + 1} count={data.pagesCount} onChange={handleChangePage} />
        </Stack>
    );
});
