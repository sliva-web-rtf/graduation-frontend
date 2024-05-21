import { baseApi } from 'shared/api';
import { Student } from 'entities/Student';
import { StudentRequest } from '../model/types/studentRequest';

const studentApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getStudent: build.query<Student, StudentRequest>({
            query: ({ id }) => ({
                url: 'api/student/student-profile-by-id',
                params: {
                    studentId: id,
                },
            }),
        }),
    }),
});

export const { useGetStudentQuery } = studentApi;
