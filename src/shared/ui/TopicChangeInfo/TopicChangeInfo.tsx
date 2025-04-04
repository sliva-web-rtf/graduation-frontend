import SwapCallsIcon from '@mui/icons-material/SwapCalls';
import { Stack, Typography } from '@mui/material';

type Props = {
    before: string;
    after: string;
};

export const TopicChangeInfo = (props: Props) => {
    const { before, after } = props;

    return (
        <Stack spacing={1} direction="row" alignItems="center">
            <SwapCallsIcon fontSize="large" color="primary" />
            <Stack>
                <Typography variant="subtitle2" color="green">
                    {after}
                </Typography>
                <Typography variant="subtitle2" color="error" sx={{ textDecoration: 'line-through' }}>
                    {before}
                </Typography>
            </Stack>
        </Stack>
    );
};
