import { Modal, Paper, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { memo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSelector } from 'react-redux';
import { BaseField } from '@/shared/ui';
import { BaseButton, BaseLoadingButton } from '@/shared/ui/Button/Button';
import { isUserProfessor } from '@/entities/User/model/selectors/getUserRoles/getUserRoles';
import styles from './CreateScientificWorkModal.module.scss';
import { AddScientificWorkFormSchema, addScientificWorkFormSchema } from '../models/types/addScientificWorkSchema';
import { useAddNewScientificWorkMutation } from '../api/newScientificWorkApi';
import { ScientificInterestsAutocomplete } from '@/entities/ScietificInterests';

export const CreateScientificWorkModal = memo(() => {
    const isProfessorRole = useSelector(isUserProfessor);
    const [isOpen, setOpen] = useState(false);
    const toggleOpen = () => setOpen((prev) => !prev);

    const [addNewScientificWork, { isLoading: isCreating }] = useAddNewScientificWorkMutation();

    const {
        formState: { errors },
        handleSubmit,
        register,
        reset,
        control,
    } = useForm<AddScientificWorkFormSchema>({
        resolver: zodResolver(addScientificWorkFormSchema),
    });

    const onSubmit = async (data: AddScientificWorkFormSchema) => {
        try {
            await addNewScientificWork({
                ...data,
                isEducator: isProfessorRole,
            });
            reset();
        } catch (err) {
            /* empty */
        }
    };

    return (
        <>
            <BaseButton sx={{ py: 1, px: 3 }} variant="shadowed" startIcon={<AddRoundedIcon />} onClick={toggleOpen}>
                Предложить тему
            </BaseButton>
            <Modal className={styles.backdrop} open={isOpen} onClose={toggleOpen}>
                <Stack direction="row" spacing={3} alignItems="flex-start" className={styles.modal}>
                    <BaseButton variant="contained" sx={{ p: 1 }} onClick={toggleOpen}>
                        <CloseRoundedIcon />
                    </BaseButton>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Stack
                            component={Paper}
                            className={styles.content}
                            spacing={4}
                            elevation={0}
                            sx={{ borderRadius: 4 }}
                        >
                            <Typography variant="h3">Предложение темы для исследования</Typography>
                            <Stack spacing={2}>
                                <BaseField
                                    autoFocus
                                    {...register('name')}
                                    label="Название темы"
                                    placeholder="Введите название темы исследования"
                                    error={Boolean(errors.name)}
                                    helperText={errors.name?.message}
                                />
                                <BaseField
                                    {...register('description')}
                                    label="Описание темы"
                                    placeholder="Кратко изложите о чем будет исследование"
                                    multiline
                                    rows={3}
                                    error={Boolean(errors.description)}
                                    helperText={errors.description?.message}
                                />
                                <BaseField
                                    {...register('result')}
                                    label="Ожидаемые результаты"
                                    placeholder="Опишите результаты, которые предполагается достичь в ходе исследования"
                                    multiline
                                    rows={3}
                                    error={Boolean(errors.result)}
                                    helperText={errors.result?.message}
                                />
                                <Controller
                                    control={control}
                                    name="scientificInterests"
                                    render={({ field: { onChange, onBlur, value } }) => (
                                        <ScientificInterestsAutocomplete
                                            multiple
                                            onChange={(_, targetValue) => onChange(targetValue)}
                                            onBlur={onBlur}
                                            value={value ?? []}
                                            limitTags={1}
                                            placeholder="Сферы научных интересов *"
                                            error={Boolean(errors.scientificInterests)}
                                            helperText={
                                                errors.scientificInterests ? errors.scientificInterests?.message : ' '
                                            }
                                        />
                                    )}
                                />
                                <BaseField
                                    type="number"
                                    {...register('limit', { valueAsNumber: true })}
                                    label="Количество участников"
                                    placeholder="Введите количество"
                                    error={Boolean(errors.limit)}
                                    helperText={errors.limit?.message}
                                />
                            </Stack>
                            <BaseLoadingButton
                                type="submit"
                                variant="contained"
                                sx={{ alignSelf: 'end', py: 1, px: 3 }}
                                loading={isCreating}
                            >
                                Предложить
                            </BaseLoadingButton>
                        </Stack>
                    </form>
                </Stack>
            </Modal>
        </>
    );
});
