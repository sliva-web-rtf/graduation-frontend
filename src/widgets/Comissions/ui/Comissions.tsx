import { ComissionCard } from '@/entities/Comission';
import { CreateCommissionButton } from '@/features/comission/create-comission';
import { Stack } from '@mui/material';

type ComissionsProps = {};

export const Comissions = (props: ComissionsProps) => {
    // const {} = props;

    return (
        <Stack spacing={2}>
            <ComissionCard
                comissionId="1"
                comissionName="Комиссия 1"
                clerk={{ id: '1', name: 'Миронова Елена Михайловна' }}
            />
            <ComissionCard
                comissionId="2"
                comissionName="Комиссия 2"
                clerk={{ id: '2', name: 'Баринов Виктор Петрович' }}
            />
            <CreateCommissionButton />
        </Stack>
    );
};
