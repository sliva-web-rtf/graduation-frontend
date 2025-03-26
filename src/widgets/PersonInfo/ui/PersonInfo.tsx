import { Grid, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ToggleUsersInfo } from './TogglePersonInfo';
import { DynamicModuleLoader, ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { PersonInfoSkeleton } from './PersonInfo.skeleton';
import { RequestButton } from '@/features/entity/AddRequests';
import classNames from './PersonInfo.module.scss';
import { PersonPortfolio } from './PersonPortfolio';
import { PersonTopics } from './PersonTopics';
import { getPersonInfoOption, personInfoReducer } from '../model';
import { ToggleOptions } from '../model/types/toggleOptions';
import { PersonCard, useGetPersonQuery } from '@/entities/Person';

const initialReducers: ReducersList = {
    'person-info': personInfoReducer,
};

export const PersonInfo = (props: { isStudent?: boolean }) => {
    const { isStudent } = props;
    const { id } = useParams();
    const option = useSelector(getPersonInfoOption);

    const { isFetching, data } = useGetPersonQuery({ id: id!, entity: isStudent ? 'student' : 'professor' });

    if (isFetching) {
        return <PersonInfoSkeleton />;
    }

    if (!data) {
        return <Typography variant="body2">Информации отсутствует</Typography>;
    }

    return (
        <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
            <Grid container gap={3}>
                <Grid item xs={2.8}>
                    <Stack spacing={3}>
                        <PersonCard {...data} />
                        <RequestButton id={id!} canJoin={data.canJoin} commandSearching professorSearching />
                    </Stack>
                </Grid>
                <Grid item xs>
                    <Stack spacing={4} alignItems="flex-start">
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
