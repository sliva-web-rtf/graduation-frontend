import { memo } from 'react';
import { BaseSelect, type BaseSelectProps } from '@/shared/ui';
import { EducationLevel } from '../../model/types/educationLevel';

type EducationLevelSelectProps = BaseSelectProps;

// TODO: переименовать в student.
export const EducationLevelSelect = memo((props: Omit<EducationLevelSelectProps, 'options'>) => (
    <BaseSelect {...props} options={EducationLevel} />
));
