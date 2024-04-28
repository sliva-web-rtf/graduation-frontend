import { Modal, Paper, Stack, Typography } from '@mui/material';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { BaseButton } from 'shared/ui/Button/Button';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import React, { useCallback, useState } from 'react';
import { useGetScientificAreasQuery, useGetScientificInterestsQuery } from 'features/catalog/Search/api/searchApi';
import { useDebounce } from 'use-debounce';
import { DEBOUNCE_DELAY } from 'shared/lib/const/const';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BaseField } from 'shared/ui';
import { BaseAutocomplete } from 'widgets/Autocomplete/Autocomplete';
import styles from './NewScientificWorkModal.module.scss';
import { NewScientificWorkFormSchema, newScientificWorkFormSchema } from '../models/types/newScientificWorkSchema';
import { useAddNewScientificWorkMutation } from '../api/newScientificWorkApi';

export const NewScientificWorkModal = () => {
    const [isOpen, setOpen] = useState(false);
    const toggleOpen = () => setOpen((prev) => !prev);
    const [search, setSearch] = useState('');
    const [searchText] = useDebounce(search, DEBOUNCE_DELAY);

    const { isFetching: isInterestsFetching, data: interests } = useGetScientificInterestsQuery(searchText);
    const { isFetching: isAreasFetching, data: areas } = useGetScientificAreasQuery();
    const [addNewScientificWork, { isLoading: isNewScientificWorkFetching }] = useAddNewScientificWorkMutation();

    const {
        formState: { errors },
        handleSubmit,
        setValue,
        register,
    } = useForm<NewScientificWorkFormSchema>({
        mode: 'onBlur',
        resolver: zodResolver(newScientificWorkFormSchema),
    });

    const handleInterestsChange = useCallback(
        (_: any, newValue: any) => {
            setValue('scientificInterests', newValue);
        },
        [setValue],
    );

    const handleAreasChange = useCallback(
        (_: any, newValue: any) => {
            setValue('scientificAreaSubsections', newValue);
        },
        [setValue],
    );

    const onSubmit = useCallback(
        (data: NewScientificWorkFormSchema) => {
            const areasWithoutSection = data.scientificAreaSubsections.map((item) => item.label);
            addNewScientificWork({
                ...data,
                scientificAreaSubsections: areasWithoutSection,
            });
        },
        [addNewScientificWork],
    );

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
                            sx={{ borderRadius: 2 }}
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
                                    placeholder="Опишите результаты, которые предполагется достичб в ходе исследования"
                                    multiline
                                    rows={3}
                                    error={Boolean(errors.result)}
                                    helperText={errors.result?.message}
                                />
                                <BaseAutocomplete
                                    placeholder="Область науки и технологий"
                                    name="scientificAreaSubsections"
                                    onChange={handleAreasChange}
                                    limitTags={1}
                                    loading={isAreasFetching}
                                    options={areas || []}
                                    groupBy={(option) => option.section}
                                    error={Boolean(errors.scientificAreaSubsections)}
                                    helperText={errors.scientificAreaSubsections?.message}
                                />
                                <BaseAutocomplete
                                    placeholder="Ключевые слова"
                                    name="scientificInterests"
                                    onChange={handleInterestsChange}
                                    limitTags={1}
                                    loading={isInterestsFetching}
                                    options={interests || []}
                                    onInputChange={(_, value) => setSearch(value)}
                                    error={Boolean(errors.scientificInterests)}
                                    helperText={errors.scientificInterests?.message}
                                />
                            </Stack>
                            <BaseButton type="submit" variant="contained" sx={{ alignSelf: 'end', py: 1, px: 3 }}>
                                Предложить
                            </BaseButton>
                        </Stack>
                    </form>
                </Stack>
            </Modal>
        </>
    );
};
