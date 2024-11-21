export interface SignupSchema {
    email: string;
    password: string;
    role: 'Студент' | 'Научный руководитель';
}
