import { Role, ROLES } from '@/entities/User';
import { BaseSelect, BaseSelectProps } from '@/shared/ui';

type Props = Omit<BaseSelectProps, 'options'>;

export const UserRolesSelect = (props: Props) => {
    const roles = Object.entries(ROLES).map(([key, value]) => ({ label: value, value: key }));

    const renderValue = (selected: unknown) =>
        (selected as string[]).map((item: string) => ROLES[item as Role]).join(', ');

    return <BaseSelect label="Роль" options={roles} multiple renderValue={renderValue} {...props} />;
};
