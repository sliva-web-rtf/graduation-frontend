import { OptionType } from '@/shared/ui';
import { AcademicGroupsDto } from '../model';

export const mapAcademicGroupsDtoToOptions = (dto?: AcademicGroupsDto): OptionType[] => {
    return (
        dto?.academicGroups?.map((group) => ({
            label: group.name,
            value: group.id,
        })) ?? []
    );
};
