import {
  Stack, TextFieldProps, Typography,
} from '@mui/material';
import { BaseField } from 'shared/ui/Field/Field';

export const InputField = (props: TextFieldProps) => {
  const { label, ...otherProps } = props;

  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2">{label}</Typography>
      <BaseField {...otherProps} />
    </Stack>
  );
};
