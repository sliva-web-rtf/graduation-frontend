import { Avatar, Stack } from '@mui/material';
import { ChangeEvent, memo, useCallback, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import { AppError } from '@/shared/lib/types/appError';
import { useDeleteAvatar, useUploadAvatar } from '@/features/avatar/api/avatarApi';
import { BaseButton } from '@/shared/ui';
import styles from './UploadAvatar.module.scss';

interface UploadAvatarProps {
    url?: string;
    width?: number;
    height?: number;
    title?: string;
    isAvatarGetting: boolean;
}

const MAX_AVATAR_MB_SIZE = 3;

export const UploadAvatar = memo(
    ({ width = 96, height = 96, title = 'Аватар', url, isAvatarGetting }: UploadAvatarProps) => {
        const [uploadAvatar, { isLoading: isUploadLoading, error: uploadError }] = useUploadAvatar();
        const [deleteAvatar, { isLoading: isDeleteLoading, error: deleteError }] = useDeleteAvatar();
        const fileRefInput = useRef<null | HTMLInputElement>(null);

        const onImageChange = useCallback(
            (event: ChangeEvent<HTMLInputElement>) => {
                const { files } = event.target;
                if (files != null) {
                    const maxSize = 1024 * 1024 * MAX_AVATAR_MB_SIZE;
                    if (maxSize > files[0]?.size || maxSize) {
                        uploadAvatar(files[0]);
                    } else {
                        toast.error(`Максимальный размер картинки должно составлять менее ${MAX_AVATAR_MB_SIZE} МБ.`);
                    }
                }
            },
            [uploadAvatar],
        );

        const onImportImage = useCallback(() => {
            const inputElement = fileRefInput.current;
            if (inputElement) {
                inputElement.click();
            }
        }, []);

        useEffect(() => {
            if (uploadError) {
                toast.error((uploadError as AppError).message);
            }
        }, [uploadError]);

        useEffect(() => {
            if (deleteError) {
                toast.error((deleteError as AppError).message);
            }
        }, [deleteError]);

        const onDeleteImage = useCallback(() => {
            if (url && url !== '') {
                deleteAvatar();
            }
        }, [deleteAvatar, url]);

        const isLoading = isUploadLoading || isAvatarGetting || isDeleteLoading;

        return (
            <Stack alignItems="center" spacing={1} flexShrink={0}>
                <Avatar src={url} title={title} sx={{ width, height, borderRadius: '50%' }} />
                <input
                    accept="image/png, image/jpg, image/jpeg"
                    onChange={onImageChange}
                    ref={fileRefInput}
                    type="file"
                    className={styles.hiddenFileInput}
                />
                <BaseButton disabled={isLoading} onClick={onImportImage} variant="contained" type="button">
                    Загрузить фото
                </BaseButton>
                <BaseButton disabled={isLoading} onClick={onDeleteImage} variant="text" type="button">
                    Сбросить фото
                </BaseButton>
            </Stack>
        );
    },
);
