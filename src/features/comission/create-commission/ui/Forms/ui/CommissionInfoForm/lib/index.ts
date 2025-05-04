import { InfoFormSchema } from '@/features/comission/create-commission/model';

export const getInfoFormDefaultValues = (data?: InfoFormSchema | null) => {
    const secretary = { id: data?.secretary?.id ?? '', name: data?.secretary?.name ?? '' };
    const chairperson = { id: data?.chairperson?.id ?? '', name: data?.chairperson?.name ?? '' };

    return {
        name: data?.name ?? '',
        secretary,
        chairperson,
    };
};
