import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Avatar', 'Catalog', 'StudentSearchingStatus', 'ProfessorSearchingStatus'],
    endpoints: () => ({}),
});
