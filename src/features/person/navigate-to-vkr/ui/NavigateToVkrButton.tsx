import { RoutePath } from '@/app/providers/Router';
import { getInfoPagePath } from '@/shared/lib/helpers/getInfoPagePath';
import { BaseButton } from '@/shared/ui';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { Link } from 'react-router-dom';

type NavigateToVkrButtonProps = {
    id: string;
};

export const NavigateToVkrButton = (props: NavigateToVkrButtonProps) => {
    const { id } = props;

    const path = getInfoPagePath(RoutePath.Diplom, id);

    return (
        // @ts-expect-error
        <BaseButton variant="outlined" component={Link} to={path} startIcon={<OpenInNewIcon />}>
            Перейти к ВКР
        </BaseButton>
    );
};
