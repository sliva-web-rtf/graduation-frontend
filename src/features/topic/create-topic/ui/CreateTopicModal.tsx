import { memo } from 'react';
import { ModalProps } from '@mui/material';
import { CreateTopicForm } from './CreateTopicForm';
import { BaseModal } from '@/shared/ui';

export const CreateTopicModal = memo((props: Omit<ModalProps, 'children'>) => {
    const { open, onClose, ...otherProps } = props;

    return (
        <BaseModal title="Создание темы ВКР" open={open} onClose={onClose} {...otherProps}>
            <CreateTopicForm />
        </BaseModal>
    );
});
