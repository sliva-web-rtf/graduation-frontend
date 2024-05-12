import { BaseButton } from 'shared/ui/Button/Button';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserAuthData } from 'entities/User';
import { RequestEnum } from 'features/entity/AddRequests/model/types/requestEnum';
import { AddRequestModal } from './AddRequestModal';
import { useAddProfessorMutation } from '../api/addRequestsApi';

interface AddProfessorButtonProps {
    readonly id: string;
    readonly canJoin: boolean;
}

export const AddProfessorButton = (props: AddProfessorButtonProps) => {
    const studentId = useSelector(getUserAuthData)?.id;
    const [scientificWorkId, setScientificWorkId] = useState('');
    const [open, setOpen] = useState(false);
    const { id: professorId, canJoin } = props;

    const [addToOrFromProfessor, { isLoading }] = useAddProfessorMutation();

    const toggleOpen = () => {
        setOpen((prev) => !prev);
        setScientificWorkId('');
    };

    const handleSubmit = async () => {
        try {
            await addToOrFromProfessor({
                professorId,
                scientificWorkId,
                studentId: studentId!,
                requestEnum: RequestEnum.FromStudent,
            });
            toggleOpen();
        } catch (error) {
            /* empty */
        }
    };

    return (
        <>
            <BaseButton variant="contained" onClick={toggleOpen} disabled={!canJoin}>
                Отправить запрос
            </BaseButton>
            <AddRequestModal
                id={professorId}
                userId={studentId!}
                open={open}
                onClose={toggleOpen}
                scientificWorkId={scientificWorkId}
                setScientificWorkId={setScientificWorkId}
                onSubmit={handleSubmit}
                disabled={isLoading}
            />
        </>
    );
};
