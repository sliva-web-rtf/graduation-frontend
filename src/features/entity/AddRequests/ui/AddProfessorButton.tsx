import { BaseButton } from 'shared/ui/Button/Button';
import { AddRequestProps } from '../model/types/addRequest';

export const AddProfessorButton = (props: AddRequestProps) => {
    const handleClick = () => console.log('sended');

    return (
        <BaseButton variant="contained" {...props}>
            Отправить запрос
        </BaseButton>
    );
};
