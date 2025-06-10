import { useSnackbar } from '@/shared/lib/hooks/useSnackbar';
import { Attach, BaseButton, BaseLoadingButton, BaseModal } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useUploadDocumentMutation } from '../api';
import { FileFormSchema, fileFormSchema } from '../model';

type DocumentUploadModalProps = {
    name: string;
    open: boolean;
    onClose: () => void;
};

export const DocumentUploadModal = (props: DocumentUploadModalProps) => {
    const { open, onClose, name } = props;
    const { showSnackbar, Snackbar } = useSnackbar();
    const [uploadDocument, { isLoading }] = useUploadDocumentMutation();

    const { control, handleSubmit, reset } = useForm<FileFormSchema>({
        // @ts-expect-error
        defaultValues: { file: null },
        resolver: zodResolver(fileFormSchema),
    });

    const closeModal = () => {
        reset();
        onClose();
    };

    const onSubmit = (data: FileFormSchema) => {
        uploadDocument(data.file)
            .unwrap()
            .then(() => showSnackbar('success', `Файл ${data.file.name} успешно загружен`))
            .then(closeModal)
            .catch((error) => showSnackbar('error', error.message));
    };

    return (
        <>
            <BaseModal
                size="small"
                open={open}
                onClose={closeModal}
                title={name}
                cancelButton={
                    <BaseButton type="reset" onClick={closeModal}>
                        Отменить
                    </BaseButton>
                }
                actionButton={
                    // @ts-expect-error
                    <BaseLoadingButton variant="contained" onClick={handleSubmit(onSubmit)} loading={isLoading}>
                        Загрузить файл
                    </BaseLoadingButton>
                }
            >
                <Controller
                    name="file"
                    control={control}
                    rules={{
                        validate: (value: unknown) => value instanceof File,
                    }}
                    render={({ field, fieldState }) => (
                        <Attach
                            {...field}
                            error={fieldState.invalid}
                            helperText={
                                fieldState.error?.message || 'Максимальный размер файла не должен превышать 5МБ'
                            }
                        />
                    )}
                />
            </BaseModal>
            {Snackbar}
        </>
    );
};
