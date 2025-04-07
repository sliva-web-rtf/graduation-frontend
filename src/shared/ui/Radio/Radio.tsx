import { FormControlLabel, Radio, RadioProps, Tooltip } from '@mui/material';

type Props = {
    value: string;
    label: string;
};

export const BaseRadio = (props: Props & RadioProps) => {
    const { value, label, ...radioProps } = props;

    return (
        <Tooltip title={label}>
            <FormControlLabel
                label={label}
                value={value}
                control={<Radio {...radioProps} />}
                sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    maxWidth: 586,
                }}
            />
        </Tooltip>
    );
};
