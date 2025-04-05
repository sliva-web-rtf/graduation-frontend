import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQueryWithReauth';

export enum TagTypes {
    Catalog = 'Catalog',
    Requests = 'Requests',
    Profile = 'Profile',
    Commissions = 'Commissions',
    Commission = 'Commission',
    MyTopics = 'MyTopics',
}

export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReauth,
    tagTypes: Object.values(TagTypes),
    endpoints: () => ({}),
});
