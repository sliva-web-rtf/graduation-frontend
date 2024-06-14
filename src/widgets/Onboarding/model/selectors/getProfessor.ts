import { createSelector } from '@reduxjs/toolkit';
import { getProfessorProfileInfo } from './getProfessorProfileInfo';

export const getProfessor = createSelector([getProfessorProfileInfo], (personalInfo) => ({ personalInfo }));
