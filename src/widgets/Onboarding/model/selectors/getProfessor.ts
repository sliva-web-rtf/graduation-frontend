import { createSelector } from '@reduxjs/toolkit';
import { getProfessorProfileInfo } from './getProfessorProfileInfo';
import { getProfessorScientificInfo } from './getProfessorScientificPortfolio';
import { getProfessorStatus } from './getProfessorStatus';

export const getProfessor = createSelector(
    [getProfessorProfileInfo, getProfessorScientificInfo, getProfessorStatus],
    (personalInfo, scientificPorfolio, professorStatus) => ({ personalInfo, scientificPorfolio, professorStatus }),
);
