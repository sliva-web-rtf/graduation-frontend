export const SITENAME = 'Мой диплом';
export const CATALOG_CARD_HEIGHT = 166;
export const DEBOUNCE_DELAY = 800;
export const ALLOWED_DOMAINS = [
    'gmail.com',
    'yahoo.com',
    'hotmail.com',
    'outlook.com',
    'aol.com',
    'icloud.com',
    'mail.ru',
    'yandex.ru',
    'urfu.ru',
    'urfu.me',
];

export const topicRoles = [
    'Аналитик',
    'UX/UI-дизайнер',
    'Frontend-разработчик',
    'Backend-разработчик',
    'Fullstack-разработчик',
    'ML-разработчик',
    'DevOps',
];

export enum SortDirection {
    DEFAULT = '',
    ASC = 'asc',
    DESC = 'desc',
}

export const DOCUMENTS = [
    'Заявление',
    'Пояснительная записка',
    'Справка о наличии заимствовании',
    'Отзыв руководителя',
    'Авторский договор',
    'Акт о внедрении',
    'NDA',
] as const;
