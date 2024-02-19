import axios, { AxiosInstance } from 'axios';

export const http: AxiosInstance = axios.create({
    baseURL: __API__,
});
