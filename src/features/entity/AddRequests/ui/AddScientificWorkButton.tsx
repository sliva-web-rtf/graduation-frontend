import { BaseLoadingButton } from 'shared/ui/Button/Button';
import { memo } from 'react';
import { useAddScientificWorkMutation } from '../api/addRequestsApi';

interface AddScientificWorkButtonProps {
    readonly id: string;
    readonly canJoin: boolean;
}

export const AddScientificWorkButton = memo((props: AddScientificWorkButtonProps) => {
    const { id, canJoin } = props;
    const [addScientificWork, { isLoading }] = useAddScientificWorkMutation();

    const handleSubmit = () => addScientificWork({ scientificWorkId: id });

    return (
        <BaseLoadingButton variant="contained" disabled={!canJoin} loading={isLoading} onClick={handleSubmit}>
            Оформить заявку
        </BaseLoadingButton>
    );
});
