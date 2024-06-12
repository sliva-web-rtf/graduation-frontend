import { createSelector } from '@reduxjs/toolkit';
import { getProfileInfo } from './getProfileInfo';
import { getStudentScientificInfo } from './getStudentScientificInfo';

export const getStudent = createSelector(
    [getProfileInfo, getStudentScientificInfo],
    (personalInfo, scientificPorfolio) => ({ personalInfo, scientificPorfolio }),
);
