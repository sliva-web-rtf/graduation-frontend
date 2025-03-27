import { FormControlLabel, Radio } from '@mui/material';
import { memo } from 'react';

interface TopicRadioProps {
    readonly value: string;
    readonly label: string;
}

export const TopicRadio = memo((props: TopicRadioProps) => {
    const { value, label } = props;

    return <FormControlLabel value={value} control={<Radio />} label={label} />;
});
