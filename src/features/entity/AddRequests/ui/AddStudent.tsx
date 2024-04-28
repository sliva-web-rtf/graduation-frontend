import { BaseButton } from 'shared/ui/Button/Button';
import { AddRequestProps } from '../model/types/addRequest';

export const AddStudent = (props: AddRequestProps) => {
    const { isSent } = props;
    const handleClick = () => console.log('sended');

    return (
        <BaseButton variant="contained" disabled={isSent}>
            Отправить запрос
        </BaseButton>
    );
};
