import { FC, lazy } from 'react';
import { SignupProps } from './SignupForm';

export const SignupForm = lazy<FC<SignupProps>>(() => import('./SignupForm'));
