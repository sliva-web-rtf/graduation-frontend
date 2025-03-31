import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { getUserData } from '@/entities/User';
import { useAddProfessorMutation, useAddStudentMutation } from '@/features/entity/AddRequests';
import { AddRequestModal } from '@/features/entity/AddRequests/ui/AddRequestModal';
import { BaseButton } from '@/shared/ui/Button/Button';

interface RequestButtonProps {
    id: string;
}

export const RequestButton = memo((props: RequestButtonProps) => {
    const { id: studentId } = props;
    const [scientificWorkId, setScientificWorkId] = useState('');
    const [open, setOpen] = useState(false);

    const [addToOrFromProfessor, { isLoading: isLoading1 }] = useAddProfessorMutation();
    const [addStudentFromStudent, { isLoading: isLoading2 }] = useAddStudentMutation();
    const { user } = useSelector(getUserData);

    if (!user) {
        return null;
    }

    const { id } = user;

    const toggleOpen = () => {
        setOpen((prev) => !prev);
        setScientificWorkId('');
    };

    const handleSubmit = async () => {
        try {
            // if (isProfessor) {
            //     await addToOrFromProfessor({
            //         studentId,
            //         scientificWorkId,
            //         professorId: id!,
            //         requestEnum: RequestEnum.FromProfessor,
            //     });
            // } else {
            //     await addStudentFromStudent({
            //         studentToId: studentId,
            //         scientificWorkId,
            //         studentFromId: id!,
            //         requestEnum: RequestEnum.FromStudent,
            //     });
            // }
            // toggleOpen();
        } catch (error) {
            /* empty */
        }
    };

    return (
        <>
            <BaseButton
                variant="contained"
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleOpen();
                }}
            >
                Оформить заявку
            </BaseButton>
            <AddRequestModal
                id={studentId}
                userId={id}
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
