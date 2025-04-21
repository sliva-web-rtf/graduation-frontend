import { Stack, Typography } from '@mui/material';

interface LimitInfoProps {
    readonly limit?: number;
    readonly fullness?: number;
}

export const LimitInfo = (props: LimitInfoProps) => {
    const { limit, fullness } = props;

    if (!fullness && !limit) return null;

    return (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Typography color="secondary">Лимиты</Typography>
            <Typography>
                {fullness || 0}/{limit || 0}
            </Typography>
        </Stack>
    );
};
