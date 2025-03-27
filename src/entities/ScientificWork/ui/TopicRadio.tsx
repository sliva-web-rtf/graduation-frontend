import { memo } from 'react';
import { Avatar, FormControlLabel, Paper, Radio, Stack, Typography } from '@mui/material';
import scientificWorkImage from '@/shared/assets/images/scientificWork.png';

interface TopicRadioProps {
    readonly value: string;
    readonly label: string;
}

export const TopicRadio = memo((props: TopicRadioProps) => {
    const { value, label } = props;

    return <FormControlLabel value={value} control={<Radio />} label={label} />;
});
