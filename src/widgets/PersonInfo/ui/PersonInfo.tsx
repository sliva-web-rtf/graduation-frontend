import { PersonCard, useGetPersonQuery } from '@/entities/Person';
import { isUserSecretary, isUserStudent, isUserSupervisor } from '@/entities/User';
import { NavigateToVkrButton } from '@/features/person/navigate-to-vkr';
import { PersonRequestButton } from '@/features/person/send-request';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { SITENAME } from '@/shared/lib/const';
import { EmptyMessage } from '@/shared/ui';
import { Grid, Stack } from '@mui/material';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getPersonInfo, personInfoReducer } from '../model';
import { ToggleOptions } from '../model/types/toggleOptions';
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
    const isSecretaryRole = useSelector(isUserSecretary);
    const isStudentRole = useSelector(isUserStudent);
    const isSupervisorRole = useSelector(isUserSupervisor);

    const { isFetching, data } = useGetPersonQuery({ id: id!, isStudent: Boolean(isStudent) }, { skip: !id });

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

    const isNavigateToVkrButtonVisible = isStudent && data.qualificationWorkId && (isSecretaryRole || isSupervisorRole);

    return (
        <>
            <Helmet>
                <title>
                    {data?.fullName} | {SITENAME}
                </title>
            </Helmet>
            <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
                <Grid container gap={3}>
                    <Grid item xs={3.5}>
                        <Stack spacing={3}>
                            <PersonCard {...data} />
                            <Stack direction="row" gap={1} justifyContent="center" width="100%" flexWrap="wrap">
                                {(isStudentRole || isSupervisorRole) && (
                                    <PersonRequestButton id={id} name={data.fullName} />
                                )}
                                {isNavigateToVkrButtonVisible && <NavigateToVkrButton id={data.qualificationWorkId!} />}
                            </Stack>
                        </Stack>
                    </Grid>
                    <Grid item xs>
                        <Stack spacing={4} alignItems="flex-start" height="100%">
                            <ToggleUsersInfo />
                            {option === ToggleOptions.Portfolio ? (
                                <PersonPortfolio about={data.about} />
                            ) : (
                                <PersonTopics userId={id!} />
                            )}
                        </Stack>
                    </Grid>
                </Grid>
            </DynamicModuleLoader>
        </>
    );
};
