import { FormControlLabel, FormGroup, Switch, SwitchProps } from '@mui/material';
import { forwardRef, Ref } from 'react';

type Props = SwitchProps & {
    label: string;
};

export const BaseSwitch = forwardRef((props: Props, ref: Ref<any>) => {
    const { label } = props;

    return (
        <FormGroup>
            <FormControlLabel ref={ref} label={label} control={<Switch {...props} />} />
        </FormGroup>
    );
});
