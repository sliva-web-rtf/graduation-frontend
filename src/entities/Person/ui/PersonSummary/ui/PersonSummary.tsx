import { Link, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { getInitials } from '@/shared/lib/helpers/getInitials';
import classes from './PersonSummary.module.scss';

interface PersonSummaryProps {
    readonly id: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly isLink: boolean;
    readonly degree?: string;
    readonly patronymic?: string;
}

// todo:
// Заменить в Link значение атрибута "to" на getInfoPagePath(AppRoutes.?, id)

export const PersonSummary: FC<PersonSummaryProps> = (props) => {
    const { id, firstName, lastName, patronymic, degree, isLink } = props;
    const name = getInitials(firstName, lastName, patronymic);

    return (
        <Stack>
            {isLink ? (
                <Typography className={classes.name} component={NavLink} to="/" variant="h4">
                    {name}
                </Typography>
            ) : (
                <Typography className={classes.name} variant="subtitle1">
                    {name}
                </Typography>
            )}

            <Typography variant="bodyXS" color="secondary">
                {degree}
            </Typography>
        </Stack>
    );
};
