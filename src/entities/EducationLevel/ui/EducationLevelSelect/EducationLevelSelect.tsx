import { memo } from 'react';
import { BaseSelect, type BaseSelectProps } from '@/shared/ui';
import { EducationLevel } from '../../model/types/educationLevel';

// TODO: переименовать в student.
export const EducationLevelSelect = memo((props: Omit<BaseSelectProps, 'options'>) => (
    <BaseSelect {...props} options={EducationLevel} />
));
