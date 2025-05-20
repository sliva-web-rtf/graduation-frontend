import { RoutePath } from '@/app/providers/Router';

export const getEditCommisionPagePath = (id: string) => RoutePath.EditComission.replace(':id', id);
