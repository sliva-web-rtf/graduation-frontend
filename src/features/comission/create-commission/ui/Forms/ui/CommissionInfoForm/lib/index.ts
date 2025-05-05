import { InfoFormSchema } from '@/features/comission/create-commission/model';

export const getInfoFormDefaultValues = (data?: InfoFormSchema | null) => {
    const secretary = { id: data?.secretary?.id ?? '', name: data?.secretary?.name ?? '' };
    const chairperson = data?.chairperson ?? null;

    return {
        name: data?.name ?? '',
        secretary,
        chairperson,
    };
};
