import { BaseButton } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import { isUserProfessor } from 'entities/User/model/selectors/getUserRoles/getUserRoles';
import { getUserAuthData } from 'entities/User';
import React, { memo, useState } from 'react';
import { useAddProfessorMutation, useAddStudentMutation } from 'features/entity/AddRequests';
import { RequestEnum } from 'features/entity/AddRequests/model/types/requestEnum';
import { AddRequestModal } from 'features/entity/AddRequests/ui/AddRequestModal';

interface AddStudentButtonProps {
    readonly id: string;
    readonly commandSearching: boolean;
    readonly professorSearching: boolean;
}

export const AddStudentButton = memo((props: AddStudentButtonProps) => {
    const { id: studentId, commandSearching, professorSearching } = props;
    const isProfessor = useSelector(isUserProfessor);
    const id = useSelector(getUserAuthData)?.id;
    const [scientificWorkId, setScientificWorkId] = useState('');
    const [open, setOpen] = useState(false);
    const disabled = (isProfessor && !professorSearching) || (!isProfessor && !commandSearching);

    const [addToOrFromProfessor, { isLoading: isLoading1 }] = useAddProfessorMutation();
    const [addStudentFromStudent, { isLoading: isLoading2 }] = useAddStudentMutation();

    const toggleOpen = () => {
        setOpen((prev) => !prev);
        setScientificWorkId('');
    };

    const handleSubmit = async () => {
        try {
            if (isProfessor) {
                await addToOrFromProfessor({
                    studentId,
                    scientificWorkId,
                    professorId: id!,
                    requestEnum: RequestEnum.FromProfessor,
                });
            } else {
                await addStudentFromStudent({
                    studentToId: studentId,
                    scientificWorkId,
                    studentFromId: id!,
                    requestEnum: RequestEnum.FromStudent,
                });
            }
            toggleOpen();
        } catch (error) {
            /* empty */
        }
    };

    return (
        <>
            <BaseButton variant="contained" onClick={toggleOpen} disabled={disabled}>
                Отправить запрос
            </BaseButton>
            <AddRequestModal
                id={studentId}
                userId={id!}
                open={open}
                onClose={toggleOpen}
                scientificWorkId={scientificWorkId}
                setScientificWorkId={setScientificWorkId}
                onSubmit={handleSubmit}
                disabled={isLoading1 || isLoading2}
            />
        </>
    );
});
