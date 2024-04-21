import { Stack, Typography } from '@mui/material';

interface LimitInfoProps {
    readonly limit: number;
    readonly fullness: number;
}

export const LimitInfo = (props: LimitInfoProps) => {
    const { limit, fullness } = props;
    const variant = 'body2';

    return (
        <Stack direction="row" spacing={1} justifyContent="flex-end" pb={3}>
            <Typography variant={variant} color="secondary">
                Лимит
            </Typography>
            <Typography variant={variant}>
                {fullness}/{limit}
            </Typography>
        </Stack>
    );
};
