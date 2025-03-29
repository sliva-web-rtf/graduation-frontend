import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { LinearProgress, Modal, ModalProps, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { BaseButton } from '../Button/Button';
import classNames from './Modal.module.scss';

type BaseModalProps = ModalProps & {
    title: string;
    children: ReactNode;

    actionButton?: ReactNode;
    cancelButton?: ReactNode;
    subtitle?: string;
    loading?: boolean;
};

const CloseButton = ({ onClick }: { onClick: any }) => (
    <BaseButton
        sx={(theme) => ({
            padding: '0 !important',
            width: 48,
            height: 48,
            backgroundColor: theme.palette.background.default,
        })}
        onClick={onClick}
    >
        <CloseRoundedIcon />
    </BaseButton>
);

export const BaseModal = (props: BaseModalProps) => {
    const {
        title,
        subtitle,
        children,
        onClose,
        open,
        actionButton,
        cancelButton,
        loading = false,
        ...otherProps
    } = props;

    return (
        <Modal open={open} onClose={onClose} {...otherProps}>
            <Stack direction="row" spacing={2} alignItems="flex-start" className={classNames.modal}>
                <CloseButton onClick={onClose} />
                <Stack spacing={4} className={classNames.content}>
                    <Stack spacing={1}>
                        <Typography variant="h2">{title}</Typography>
                        <Typography color="secondary">{subtitle}</Typography>
                    </Stack>
                    {loading ? <LinearProgress /> : children}
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
