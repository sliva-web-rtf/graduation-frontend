import { FormControlLabel, FormGroup, Switch, SwitchProps } from '@mui/material';

type Props = {
    label: string;
};

export const BaseSwitch = (props: Props & SwitchProps) => {
    const { label, required = false, defaultChecked = false, disabled = false } = props;

    return (
        <FormGroup>
            <FormControlLabel
                label={label}
                required={required}
                disabled={disabled}
                control={<Switch defaultChecked={defaultChecked} />}
            />
        </FormGroup>
    );
};
