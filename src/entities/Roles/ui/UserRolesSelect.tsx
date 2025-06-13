import { Role, ROLES } from '@/entities/User';
import { BaseSelect, BaseSelectProps } from '@/shared/ui';
import { forwardRef } from 'react';

type Props = Omit<BaseSelectProps, 'options'>;

export const UserRolesSelect = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {
    const roles = Object.entries(ROLES).map(([key, value]) => ({ label: value, value: key }));

    const renderValue = (selected: unknown) =>
        (selected as string[]).map((item: string) => ROLES[item as Role]).join(', ');

    return <BaseSelect inputRef={ref} label="Роль" options={roles} multiple renderValue={renderValue} {...props} />;
});
