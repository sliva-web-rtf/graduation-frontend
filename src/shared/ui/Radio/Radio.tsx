import { FormControlLabel, Radio, RadioProps } from '@mui/material';

type Props = {
    value: string;
    label: string;
};

export const BaseRadio = (props: Props & RadioProps) => {
    const { value, label, ...radioProps } = props;

    return <FormControlLabel label={label} value={value} control={<Radio {...radioProps} />} />;
};
