import { memo } from 'react';
import { BaseLoadingButton } from '@/shared/ui/Button/Button';
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
        <BaseLoadingButton
            variant="contained"
            disabled={!canJoin}
            loading={isLoading}
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSubmit();
            }}
        >
            Оформить заявку
        </BaseLoadingButton>
    );
});
