import { Box, Skeleton, Stack } from '@mui/material';

export const ComissionFormSkeleton = () => {
    return (
        <Stack direction="row" spacing={4} height="100%">
            <Stack
                position="sticky"
                width="30%"
                minWidth={320}
                maxWidth={400}
                alignSelf="flex-start"
                top={32}
                spacing={2}
            >
                <Skeleton
                    variant="rectangular"
                    height={450}
                    sx={(theme) => ({ padding: theme.spacing(2), borderRadius: theme.spacing(2) })}
                />
            </Stack>
            <Box width="100%">
                <Skeleton
                    variant="rectangular"
                    height="70vh"
                    sx={(theme) => ({ padding: theme.spacing(2), borderRadius: theme.spacing(2) })}
                />
            </Box>
        </Stack>
    );
};
