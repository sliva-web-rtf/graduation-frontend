import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import {
    AccessebilityIcon,
    ArchiveIcon,
    AtomIcon,
    BookIcon,
    ConferencesIcon,
    DatabaseIcon,
    FlaskIcon,
    GitCompareIcon,
    GlobeIcon,
    JournalIcon,
    OpenBookIcon,
    ServerIcon,
    TaskListIcon,
    UrfuIcon,
    WebIcon,
} from 'shared/ui';

const a = {
    title: 'Гайд по исследовательской деятельности',
    content: [
        {
            id: 1,
            icon: <AtomIcon />,
            title: 'Порядок работы над исследованиями',
            url: 'https://urgi.urfu.ru/ru/polit/student/nir/',
        },
        {
            id: 2,
            icon: <ServerIcon />,
            title: 'О наукометрических базах',
            url: 'https://nvjournal.ru/blog/article/osnovnye-etapy-nauchnogo-issledovaniya/',
        },
    ],
};

const b = {
    title: 'Организационное сопровождение и поддержка научных исследований',
    content: [
        {
            id: 3,
            icon: <FlaskIcon />,
            title: 'Научно-учебные лаборатории',
            url: 'https://urfu.ru/ru/science/stimul-pablik/',
        },
        {
            id: 4,
            icon: <ConferencesIcon />,
            title: 'Научные мероприятия(конференции, семинары и др.)',
            url: 'https://sciencedata.urfu.ru/',
        },
        {
            id: 5,
            // TODO icon
            icon: <AlternateEmailIcon color="primary" />,
            title: 'Ведущие научные школы',
            url: 'http://lib.urfu.ru/',
        },
        {
            id: 6,
            icon: <GitCompareIcon />,
            title: 'Академическая мобильность',
            url: 'https://elar.urfu.ru/',
        },
        {
            id: 7,
            icon: <WebIcon />,
            title: 'Портал молодежной науки',
            url: 'https://urfu.ru/ru/science/grants/',
        },
        {
            id: 8,
            icon: <OpenBookIcon />,
            title: 'Центры коллективного пользования',
            url: 'https://urfu.ru/ru/science/grants/',
        },
    ],
};

const c = {
    title: 'Публикации (доступ, издание, оценка, справочная информация)',
    content: [
        {
            id: 9,
            icon: <UrfuIcon />,
            title: 'Научно-исследовательский портал (UrFU Research Portal)',
            url: 'https://urfu.ru/ru/science/osnovnye-napravlenija-nauchnoi-dejatelnosti/',
        },
        {
            id: 10,
            // TODO icon
            icon: <AlternateEmailIcon color="primary" />,
            title: 'Электронный научный архив',
            url: 'https://urfu.ru/ru/science/futurerussia/',
        },
        {
            id: 11,
            icon: <JournalIcon />,
            title: 'Научное издательство УрФУ',
            url: 'https://ural-carbon.urfu.ru/ru/',
        },
        {
            id: 12,
            icon: <GlobeIcon />,
            title: 'Зарубежное научное издательство',
            url: 'https://urfu.ru/ru/science/breakthrough/',
        },
        {
            id: 13,
            icon: <ArchiveIcon />,
            title: 'Научная библиотека УрФУ',
            url: 'https://urfu.ru/ru/science/mezhdunarodnoe-sotrudnichestvo/',
        },
        {
            id: 14,
            icon: <TaskListIcon />,
            title: 'Требования к публикациям в научных журналах',
            url: 'https://urfu.ru/ru/science/nich/dogovory-podrjada/',
        },
    ],
};

const d = {
    title: 'Полезные ресурсы',
    content: [
        {
            id: 15,
            icon: <DatabaseIcon />,
            title: 'Ресурсная база для науки',
            url: 'https://prorektor.ru/studentam/gost-nir-nauchno-issledovatelskoy-raboty/',
        },
        {
            id: 16,
            icon: <BookIcon />,
            title: 'Научные библиотеки',
            url: 'https://urgi.urfu.ru/ru/polit/student/doc/',
        },
        {
            id: 17,
            icon: <AccessebilityIcon />,
            title: 'Соц. сети для science-сообщества',
            url: 'https://sibac.info/blog/trebovaniya-vak-predyavlyaemye-k-kandidatskoy-dissertacii-v-2019-godu/',
        },
    ],
};

const e = {
    title: 'Стипендиальные программы',
    content: [
        {
            id: 18,
            // TODO icon
            icon: <AlternateEmailIcon color="primary" />,
            title: 'Конкурсы',
            url: 'https://cs.msu.ru/sites/cmc/files/docs/2021-11gost_7.32-2017.pdf',
        },
        {
            id: 19,
            // TODO icon
            icon: <AlternateEmailIcon color="primary" />,
            title: 'Гранты РНФ',
            url: 'https://dissovet.urfu.ru/ru/glavnaja/',
        },
        {
            id: 20,
            // TODO icon
            icon: <AlternateEmailIcon color="primary" />,
            title: 'Стипендии от УрФУ',
            url: 'https://urfu.ru/ru/science/osnovnye-napravlenija-nauchnoi-dejatelnosti/',
        },
        {
            id: 21,
            // TODO icon
            icon: <AlternateEmailIcon color="primary" />,
            title: 'Стипендии и медали от РАН',
            url: 'https://urfu.ru/ru/science/osnovnye-napravlenija-nauchnoi-dejatelnosti/',
        },
        {
            id: 22,
            // TODO icon
            icon: <AlternateEmailIcon color="primary" />,
            title: 'Внешнее финансирование',
            url: 'https://urfu.ru/ru/science/osnovnye-napravlenija-nauchnoi-dejatelnosti/',
        },
    ],
};

export const MANUAL = [a, b, c, d, e];
