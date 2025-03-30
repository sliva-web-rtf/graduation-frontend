import { CreateTopicPage } from '@/pages/CreateTopicPage';

// const MyDimpomPage = () => (
//     <>
//         <Helmet>
//             <title>Мой диплом | {SITENAME}</title>
//         </Helmet>
//         <Stack spacing={10} height="100%">
//             <Stack spacing={2}>
//                 <Typography variant="h1">Тема ВКР не выбрана</Typography>
//                 <Typography color="secondary">
//                     Создайте свою тему и начните работать над выпускной квалификационной работой
//                 </Typography>
//             </Stack>
//             <CreateTopicForm />
//         </Stack>
//     </>
// );

const MyDimpomPage = () => {
    return <CreateTopicPage />;
};

export default MyDimpomPage;
