import { Stack, Typography } from '@mui/material';

interface LimitInfoProps {
    readonly limit?: number;
    readonly fullness?: number;
}

export const LimitInfo = (props: LimitInfoProps) => {
    const { limit, fullness } = props;
    const variant = 'body2';

    if (!fullness && !limit) return null;

    return (
        <Stack direction="row" spacing={1} justifyContent="flex-end">
            <Typography variant={variant} color="secondary">
                Лимит
            </Typography>
            <Typography variant={variant}>
                {fullness || 0}/{limit || 0}
            </Typography>
        </Stack>
    );
};
