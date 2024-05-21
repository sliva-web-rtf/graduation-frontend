import { Modal, Paper, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { BaseButton, BaseLoadingButton } from 'shared/ui/Button/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import React, { memo, useState } from 'react';
import { useGetScientificAreasQuery, useGetScientificInterestsQuery } from 'features/catalog/Search/api/searchApi';
import { useDebounce } from 'use-debounce';
import { DEBOUNCE_DELAY } from 'shared/lib/const/const';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseField } from 'shared/ui';
import { BaseAutocomplete } from 'widgets/Autocomplete/Autocomplete';
import { useSelector } from 'react-redux';
import { isUserProfessor } from 'entities/User/model/selectors/getUserRoles/getUserRoles';
import styles from './CreateScientificWorkModal.module.scss';
import { AddScientificWorkFormSchema, addScientificWorkFormSchema } from '../models/types/addScientificWorkSchema';
import { useAddNewScientificWorkMutation } from '../api/newScientificWorkApi';

export const CreateScientificWorkModal = memo(() => {
    const isProfessorRole = useSelector(isUserProfessor);
    const [isOpen, setOpen] = useState(false);
    const [isInterestsOpen, setInterestsOpen] = useState(false);
    const [isAreasOpen, setAreasOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [searchText] = useDebounce(search, DEBOUNCE_DELAY);
    const toggleOpen = () => setOpen((prev) => !prev);

    const { isFetching: isInterestsFetching, data: interests } = useGetScientificInterestsQuery(searchText, {
        skip: !isInterestsOpen,
    });
    const { isFetching: isAreasFetching, data: areas } = useGetScientificAreasQuery(undefined, {
        skip: !isAreasOpen,
    });
    const [addNewScientificWork, { isLoading: isCreating }] = useAddNewScientificWorkMutation();

    const {
        formState: { errors },
        handleSubmit,
        setValue,
        register,
        reset,
    } = useForm<AddScientificWorkFormSchema>({
        resolver: zodResolver(addScientificWorkFormSchema),
    });

    const handleInterestsChange = (_: any, newValue: string[]) => {
        setValue('scientificInterests', newValue);
    };

    const handleAreasChange = (_: any, newValue: any) => {
        setValue('scientificAreaSubsections', newValue);
    };

    const onSubmit = async (data: AddScientificWorkFormSchema) => {
        const areasWithoutSection = data.scientificAreaSubsections.map((item) => item.label);
        try {
            await addNewScientificWork({
                ...data,
                scientificAreaSubsections: areasWithoutSection,
                isEducator: isProfessorRole,
            });
            toggleOpen();
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
                                <BaseAutocomplete
                                    placeholder="Область науки и технологий"
                                    name="scientificAreaSubsections"
                                    limitTags={1}
                                    loading={isAreasFetching}
                                    options={areas || []}
                                    groupBy={(option) => option.section}
                                    error={Boolean(errors.scientificAreaSubsections)}
                                    helperText={errors.scientificAreaSubsections?.message}
                                    onChange={handleAreasChange}
                                    onOpen={() => setAreasOpen(true)}
                                />
                                <BaseAutocomplete
                                    placeholder="Ключевые слова"
                                    name="scientificInterests"
                                    limitTags={1}
                                    loading={isInterestsFetching}
                                    options={interests || []}
                                    error={Boolean(errors.scientificInterests)}
                                    helperText={errors.scientificInterests?.message}
                                    onChange={handleInterestsChange}
                                    onInputChange={(_, value) => setSearch(value)}
                                    onOpen={() => setInterestsOpen(true)}
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
