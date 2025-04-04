import { CatalogListSkeleton } from '@/widgets/Catalog/ui/CatalogList';
import { Stack } from '@mui/material';
import { useGetMyTopicsQuery } from '../api';
import { MyTopicsEmpty } from './MyTopics.empty';

type MyTopicsProps = {};

export const MyTopics = (props: MyTopicsProps) => {
    const { data, isFetching } = useGetMyTopicsQuery();

    if (isFetching) {
        return <CatalogListSkeleton count={3} />;
    }

    if (!data?.length || !data) {
        return <MyTopicsEmpty />;
    }

    return <Stack>мои темы</Stack>;
};
