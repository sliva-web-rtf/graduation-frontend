import { Box, TextFieldProps, Typography } from '@mui/material';
import { BaseField } from 'shared/ui/Field/Field';
import styles from './InputField.module.scss';

export const InputField = (props: TextFieldProps) => {
  const { label, ...otherProps } = props;

  return (
    <Box className={styles.box}>
      <Typography variant="subtitle2">{label}</Typography>
      <BaseField {...otherProps} />
    </Box>
  );
};
