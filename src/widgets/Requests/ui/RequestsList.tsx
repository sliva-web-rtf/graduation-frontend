import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RequestCard } from '@/entities/Request';
import { BaseList } from '@/shared/ui/List/List';
import { getRequestsSection, RequestsSectionOption } from '../model';
import styles from './RequestsList.module.scss';

const incoming = [
    {
        id: 1,
        date: '3 марта 2025',
        topicName: 'Стеклокристаллические бессвинцовые материалы с увеличенной удельной плотностью запасаемой энергии',
        text: 'Токарев А.И. предлагает свою тему',
        link: '#',
        isIncoming: true,
    },
    {
        id: 2,
        date: '2 марта 2025',
        topicName: 'Влияние угроз кибербезопасности на технологии и общество',
        text: 'Токарев А.И. хочет взять руководство над темой',
        link: '#',
        isIncoming: true,
        isTopicChange: true,
        beforeTopicName:
            'Стеклокристаллические бессвинцовые материалы с увеличенной удельной плотностью запасаемой энергии',
    },
];
const outgoing = [
    {
        id: 3,
        date: '3 марта 2025',
        topicName: 'Стеклокристаллические бессвинцовые материалы с увеличенной удельной плотностью запасаемой энергии',
        text: 'Вы предлагаете свою тему Токарев А.И. ',
        link: '#',
        isOutgoing: true,
    },
    {
        id: 4,
        date: '2 марта 2025',
        topicName: 'Влияние угроз кибербезопасности на технологии и общество',
        text: 'Вы хотите взять тему Токарев А.И. ',
        link: '#',
        isOutgoing: true,
    },
];
const history = [
    {
        id: 5,
        date: '3 марта 2025',
        topicName: 'Стеклокристаллические бессвинцовые материалы с увеличенной удельной плотностью запасаемой энергии',
        text: 'Вы подтвердили изменение темы Чертолин Н.И.',
        link: '#',
        isHistory: true,
    },
];

const getData = (option: RequestsSectionOption) => {
    switch (option) {
        case RequestsSectionOption.Incoming:
            return incoming;
        case RequestsSectionOption.Outgoing:
            return outgoing;
        case RequestsSectionOption.History:
            return history;
        default:
            return [];
    }
};

export const RequestsList = () => {
    const { option } = useSelector(getRequestsSection);
    const data = getData(option);

    const render = useCallback((item: any) => {
        // const transformed = transformDtoForCatalogCard(item);
        return <RequestCard key={item.id} {...item} />;
    }, []);

    // const { isFetching, data } = useGetCatalogQuery({ option, params: { search, page, pageSize, direction, order } });

    // if (isFetching) {
    //     return <RequestsListSkeleton count={pageSize} />;
    // }

    // if (!data?.data?.length) {
    //     return <Typography>Ничего не найдено</Typography>;
    // }

    return <BaseList className={styles.list} items={data} render={render} />;
};
