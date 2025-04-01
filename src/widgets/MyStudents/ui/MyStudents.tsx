import { BaseTable } from '@/shared/ui';
import { Stack } from '@mui/material';
import { GridColDef, GridRowsProp } from '@mui/x-data-grid';

type MyStudentsProps = {};

const rows: GridRowsProp = [
    {
        id: 1,
        name: 'Иванов Иван Петрович',
        group: 'РИ-410940',
        topic: 'Разработка клиентской части платформы учебной',
        status: 'Утверждена',
        role: 'Frontend-разработчик',
        supervisor: 'Сидоров Михаил Иванович',
        companyName: 'Не указано',
        companySupervisor: 'Не указано',
    },
    {
        id: 2,
        name: 'Петров Сергей Владимирович',
        group: 'РИ-410941',
        topic: 'Разработка backend-части корпоративного портала',
        status: 'На рассмотрении',
        role: 'Backend-разработчик',
        supervisor: 'Кузнецов Александр Олегович',
        companyName: 'ООО "ТехноСофт"',
        companySupervisor: 'Андреев Василий Николаевич',
    },
    {
        id: 3,
        name: 'Смирнова Анастасия Олеговна',
        group: 'РИ-410942',
        topic: 'Проектирование базы данных для CRM-системы',
        status: 'Отклонена',
        role: 'Data Engineer',
        supervisor: 'Григорьев Дмитрий Петрович',
        companyName: 'АО "ИнфоТех"',
        companySupervisor: 'Не указано',
    },
    {
        id: 4,
        name: 'Васильев Алексей Дмитриевич',
        group: 'РИ-410943',
        topic: 'Разработка мобильного приложения для доставки еды',
        status: 'Утверждена',
        role: 'Mobile-разработчик',
        supervisor: 'Романов Евгений Викторович',
        companyName: 'ООО "FoodExpress"',
        companySupervisor: 'Фёдоров Николай Сергеевич',
    },
    {
        id: 5,
        name: 'Козлова Марина Викторовна',
        group: 'РИ-410944',
        topic: 'Разработка системы машинного обучения для рекомендаций',
        status: 'На рассмотрении',
        role: 'ML Engineer',
        supervisor: 'Никитин Олег Анатольевич',
        companyName: 'Не указано',
        companySupervisor: 'Не указано',
    },
    {
        id: 6,
        name: 'Фролов Дмитрий Сергеевич',
        group: 'РИ-410945',
        topic: 'Разработка бэкенда для IoT-устройств',
        status: 'Утверждена',
        role: 'Backend-разработчик',
        supervisor: 'Гаврилов Виктор Степанович',
        companyName: 'АО "СмартТех"',
        companySupervisor: 'Зиновьев Андрей Павлович',
    },
    {
        id: 7,
        name: 'Морозова Наталья Евгеньевна',
        group: 'РИ-410946',
        topic: 'Разработка системы автоматического тестирования',
        status: 'Отклонена',
        role: 'QA Engineer',
        supervisor: 'Рыбаков Сергей Владимирович',
        companyName: 'Не указано',
        companySupervisor: 'Не указано',
    },
    {
        id: 8,
        name: 'Гусев Артём Александрович',
        group: 'РИ-410947',
        topic: 'Создание веб-приложения для управления проектами',
        status: 'На рассмотрении',
        role: 'Fullstack-разработчик',
        supervisor: 'Беляев Алексей Константинович',
        companyName: 'ООО "DevSoft"',
        companySupervisor: 'Мельников Дмитрий Олегович',
    },
    {
        id: 9,
        name: 'Романова Екатерина Павловна',
        group: 'РИ-410948',
        topic: 'Разработка нейросетевой модели для анализа текстов',
        status: 'Утверждена',
        role: 'ML Engineer',
        supervisor: 'Тихонов Олег Владиславович',
        companyName: 'АО "AI Solutions"',
        companySupervisor: 'Не указано',
    },
    {
        id: 10,
        name: 'Кузнецов Артём Юрьевич',
        group: 'РИ-410949',
        topic: 'Разработка админ-панели для управления контентом',
        status: 'Отклонена',
        role: 'Fullstack-разработчик',
        supervisor: 'Орлов Николай Викторович',
        companyName: 'ООО "WebTech"',
        companySupervisor: 'Иванов Дмитрий Сергеевич',
    },
];

const columns: GridColDef[] = [
    { field: 'id', headerName: '№', width: 64 },
    { field: 'name', headerName: 'ФИО', width: 400 },
    { field: 'group', headerName: 'Группа', width: 150 },
    { field: 'topic', headerName: 'Тема', width: 400 },
    { field: 'status', headerName: 'Статус темы', width: 250 },
    { field: 'role', headerName: 'Роль', width: 300 },
    { field: 'supervisor', headerName: 'Руководитель', width: 400 },
    { field: 'companyName', headerName: 'Предприятие', width: 400 },
    { field: 'companySupervisor', headerName: 'Куратор от предприятия', width: 400 },
];

export const MyStudents = (props: MyStudentsProps) => {
    return (
        <Stack height="100%" sx={{ overflowX: 'hidden', maxWidth: 'calc(var(--page-width) - 282px)' }}>
            <BaseTable rows={rows} columns={columns} />
        </Stack>
    );
};
