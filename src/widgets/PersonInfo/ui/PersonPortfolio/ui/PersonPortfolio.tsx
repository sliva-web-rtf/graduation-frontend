import { Stack } from '@mui/material';
import { InfoCard } from '@/shared/ui';

type PortfolioProps = {
    about?: string;
};

export const PersonPortfolio = (props: PortfolioProps) => {
    const { about } = props;

    return (
        <Stack width="100%">
            <InfoCard title="О себе" text={about} />
        </Stack>
    );
};
