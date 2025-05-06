import { useGetStudentsQuery } from '@/entities/Student';
import { useEditCommissionContext } from '@/features/comission/edit-commision';
import { BasePagination, EmptyMessage } from '@/shared/ui';
import { BaseCheckboxSkeletonList } from '@/shared/ui/Checkbox/Checkbox.skeleton';
import { FormControl, Stack } from '@mui/material';
import { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { StudentsFormSchema } from '../../../../../model';
import {
    getStudentCommissionChangeHandler,
    getStudentIsChecked,
    getStudentIsDefaultChecked,
    getStudentsChangeHandler,
    getStudentsCurrentCommission,
} from '../lib';
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
    const editContext = useEditCommissionContext();
    const editCommissionId = editContext?.commissionId ?? null;

    const { data, isFetching } = useGetStudentsQuery({
        query,
        size,
        page,
        stage,
        sortByAcademicGroups: academicGroups,
        commissionId: editCommissionId,
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
                                    const { commissionId, commissionName } = getStudentsCurrentCommission(field, item);
                                    const defaultChecked = getStudentIsDefaultChecked(
                                        item,
                                        commissionId,
                                        editCommissionId,
                                        academicGroups,
                                    );
                                    const checked = defaultChecked || getStudentIsChecked(field, item);

                                    return (
                                        <StudentCheckbox
                                            key={item.id}
                                            student={item}
                                            isChecked={checked}
                                            isDefaultChecked={defaultChecked}
                                            onCheckChange={handleStudentChange(item.id)}
                                            onCommissionChange={handleCommissionChange(item.id)}
                                            currentCommissionId={commissionId}
                                            currentCommissionName={commissionName}
                                            blocked={item.blocked}
                                            editCommissionId={editCommissionId}
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
