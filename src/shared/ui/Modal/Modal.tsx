import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { LinearProgress, Modal, ModalProps, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { BaseButton } from '../Button/Button';
import classNames from './Modal.module.scss';

type BaseModalProps = ModalProps & {
    children: ReactNode;

    title?: string;
    actionButton?: ReactNode;
    cancelButton?: ReactNode;
    subtitle?: string;
    loading?: boolean;
    size?: 'small' | 'medium' | 'large';
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
        size,
        ...otherProps
    } = props;
    // eslint-disable-next-line no-nested-ternary
    const width = size === undefined ? undefined : size === 'small' ? 400 : size === 'large' ? 800 : 600;

    return (
        <Modal open={open} onClose={onClose} {...otherProps}>
            <Stack direction="row" spacing={2} alignItems="flex-start" className={classNames.modal}>
                <CloseButton onClick={onClose} />
                <Stack spacing={4} className={classNames.content} width={width}>
                    <Stack spacing={1}>
                        {title && <Typography variant="h2">{title}</Typography>}
                        {subtitle && <Typography color="secondary">{subtitle}</Typography>}
                    </Stack>
                    {loading ? <LinearProgress /> : children}
                    {(cancelButton || actionButton) && (
                        <Stack direction="row" spacing={2} alignSelf="flex-end">
                            {cancelButton}
                            {actionButton}
                        </Stack>
                    )}
                </Stack>
            </Stack>
        </Modal>
    );
};
