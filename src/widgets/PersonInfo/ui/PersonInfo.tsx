import { PersonCard, useGetPersonQuery } from '@/entities/Person';
import { PersonRequestButton } from '@/features/person/send-request';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { EmptyMessage } from '@/shared/ui';
import { Grid, Stack } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPersonInfo, personInfoReducer } from '../model';
import { ToggleOptions } from '../model/types/toggleOptions';
import classNames from './PersonInfo.module.scss';
import { PersonInfoSkeleton } from './PersonInfo.skeleton';
import { PersonPortfolio } from './PersonPortfolio';
import { PersonTopics } from './PersonTopics';
import { ToggleUsersInfo } from './TogglePersonInfo';

const initialReducers: ReducersList = {
    'person-info': personInfoReducer,
};

export const PersonInfo = (props: { isStudent?: boolean }) => {
    const { isStudent } = props;
    const { id } = useParams();
    const { option } = useSelector(getPersonInfo);

    const { isFetching, data } = useGetPersonQuery({ id: id!, isStudent: Boolean(isStudent) });

    if (isFetching) {
        return <PersonInfoSkeleton />;
    }

    if (!data || !id) {
        return (
            <Stack height="100%">
                <EmptyMessage />
            </Stack>
        );
    }

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Grid container gap={3}>
                <Grid item xs={3.5}>
                    <Stack spacing={3}>
                        <PersonCard {...data} />
                        <PersonRequestButton id={id} name={data.fullName} />
                    </Stack>
                </Grid>
                <Grid item xs>
                    <Stack spacing={4} alignItems="flex-start" height="100%">
                        <ToggleUsersInfo />
                        {option === ToggleOptions.Portfolio ? (
                            <PersonPortfolio about={data.about} />
                        ) : (
                            <PersonTopics userId={id!} className={classNames.list} />
                        )}
                    </Stack>
                </Grid>
            </Grid>
        </DynamicModuleLoader>
    );
};
