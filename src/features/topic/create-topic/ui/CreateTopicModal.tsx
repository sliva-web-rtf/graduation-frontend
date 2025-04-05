import { BaseAlert, BaseModal } from '@/shared/ui';
import { ModalProps } from '@mui/material';
import { memo } from 'react';
import { CreateTopicForm } from './CreateTopicForm';

export const CreateTopicModal = memo((props: Omit<ModalProps, 'children'>) => {
    const { open, onClose, ...otherProps } = props;

    return (
        <BaseModal title="Создание темы ВКР" open={open} onClose={onClose} {...otherProps}>
            <>
                <BaseAlert severity="info">После создания темы вас перенаправит на ее страницу</BaseAlert>
                <CreateTopicForm />
            </>
        </BaseModal>
    );
});
