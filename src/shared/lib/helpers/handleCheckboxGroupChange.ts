import { ChangeEvent } from 'react';

type CheckboxGroupOnChange = (
    event: ChangeEvent<HTMLInputElement>,
    currentValues: string[],
    itemId: string,
) => string[];

export const handleCheckboxGroupChange: CheckboxGroupOnChange = (event, currentValues, itemId) => {
    return event.target.checked ? [...currentValues, itemId] : currentValues.filter((v: string) => v !== itemId);
};
