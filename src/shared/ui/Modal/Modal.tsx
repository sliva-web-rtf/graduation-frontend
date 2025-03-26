import { ReactNode } from 'react';
import { Modal, ModalProps, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { BaseButton } from '../Button/Button';
import classNames from './Modal.module.scss';

type BaseModalProps = ModalProps & {
    title: string;
    children: ReactNode;

    actionButton?: ReactNode;
    cancelButton?: ReactNode;
    subtitle?: string;
};

const CloseButton = ({ onClick }: { onClick: any }) => (
    <BaseButton variant="shadowed" sx={{ width: 48, height: 48 }} onClick={onClick}>
        <CloseRoundedIcon />
    </BaseButton>
);
export const BaseModal = (props: BaseModalProps) => {
    const { title, subtitle, children, onClose, open, actionButton, cancelButton, ...otherProps } = props;

    return (
        <Modal open={open} onClose={onClose} {...otherProps}>
            <Stack direction="row" spacing={2} alignItems="flex-start" className={classNames.modal}>
                <CloseButton onClick={onClose} />
                <Stack spacing={4} className={classNames.content}>
                    <Stack>
                        <Typography variant="h2">{title}</Typography>
                        <Typography color="secondary">{subtitle}</Typography>
                    </Stack>
                    {children}
                    {cancelButton ||
                        (actionButton && (
                            <Stack direction="row" spacing={4} alignSelf="flex-end">
                                {cancelButton}
                                {actionButton}
                            </Stack>
                        ))}
                </Stack>
            </Stack>
        </Modal>
    );
};
