import { Attach, BaseButton, BaseLoadingButton, BaseModal } from '@/shared/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { FileFormSchema, fileFormSchema } from '../model';

type DocumentUploadModalProps = {
    name: string;
    open: boolean;
    onClose: () => void;
};

export const DocumentUploadModal = (props: DocumentUploadModalProps) => {
    const { open, onClose, name } = props;
    const { control, handleSubmit } = useForm<FileFormSchema>({
        // @ts-expect-error
        defaultValues: { file: null },
        resolver: zodResolver(fileFormSchema),
    });

    const onSubmit = (data: FileFormSchema) => {
        toast.success(`Файл ${data.file.name} успешно загружен`);
    };

    return (
        <BaseModal
            open={open}
            onClose={onClose}
            title={name}
            cancelButton={
                <BaseButton type="reset" onClick={onClose}>
                    Отменить
                </BaseButton>
            }
            actionButton={
                // @ts-expect-error
                <BaseLoadingButton variant="contained" onClick={handleSubmit(onSubmit)}>
                    Загрузить
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
                        helperText={fieldState.error?.message || 'Максимальный размер файла не должен превышать 5МБ'}
                    />
                )}
            />
        </BaseModal>
    );
};
