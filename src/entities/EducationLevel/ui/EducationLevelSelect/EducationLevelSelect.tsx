import { memo } from 'react';
import { BaseSelect, type BaseSelectProps } from '@/shared/ui';
import { EducationLevel } from '../../model/types/educationLevel';

type EducationLevelSelectProps = BaseSelectProps;

export const EducationLevelSelect = memo((props: Omit<EducationLevelSelectProps, 'options'>) => (
    <BaseSelect {...props} options={EducationLevel} />
));
