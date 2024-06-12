import { BaseButton } from '@/shared/ui/Button/Button';

export const AddScientificWorkButton = (props: any) => {
    const handleClick = () => console.log('sended');

    return (
        <BaseButton variant="contained" {...props}>
            Оформить заявку
        </BaseButton>
    );
};
