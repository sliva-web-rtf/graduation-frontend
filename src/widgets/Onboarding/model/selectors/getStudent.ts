import { createSelector } from '@reduxjs/toolkit';
import { getProfileInfo } from './getProfileInfo';
import { getStudentScientificInfo } from './getStudentScientificInfo';
import { getStudentStatus } from './getStudentStatus';

export const getStudent = createSelector(
    [getProfileInfo, getStudentScientificInfo, getStudentStatus],
    (personalInfo, scientificPorfolio, studentStatus) => ({ personalInfo, scientificPorfolio, studentStatus }),
);
