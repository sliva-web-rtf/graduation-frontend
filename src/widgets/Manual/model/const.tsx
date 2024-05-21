import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import StorageIcon from '@mui/icons-material/Storage';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';

export const MANUAL = [
    {
        title: 'Гайд по исследовательской деятельности',
        content: [
            {
                id: '1',
                icon: <AlternateEmailIcon color="primary" />,
                title: 'Порядок работы над исследованиями',
                description: 'Объединение нескольких лабораторий с уникальным комплексом оборудования',
            },
            {
                id: '2',
                icon: <StorageIcon color="primary" />,
                title: 'О наукометрических базах',
                description: 'Объединение нескольких лабораторий с уникальным комплексом оборудования',
            },
        ],
    },
    {
        title: 'Организационное сопровождение и поддержка научных исследований',
        content: [
            {
                id: '3',
                icon: <ScienceOutlinedIcon color="primary" />,
                title: 'Научно-учебные лаборатории',
                description: 'Объединение нескольких лабораторий с уникальным комплексом оборудования',
            },
            {
                id: '4',
                icon: <MoveDownIcon color="primary" />,
                title: 'Академическая мобильность',
                description: 'Объединение нескольких лабораторий с уникальным комплексом оборудования',
            },
        ],
    },
];
