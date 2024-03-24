import { Stack, Typography } from '@mui/material';

interface LimitInfoProps {
  readonly current: number,
  readonly max: number,
}

export const LimitInfo = (props: LimitInfoProps) => {
  const { current, max } = props;
  const variant = 'body2';

  return (
    <Stack direction="row" spacing={1} justifyContent="flex-end" pb={3}>
      <Typography variant={variant} color="secondary">
        Лимит
      </Typography>
      <Typography variant={variant}>
        {current}
        /
        {max}
      </Typography>
    </Stack>
  );
};
