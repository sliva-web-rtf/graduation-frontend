import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';

import { UploadAvatar, useGetAvatar } from '@/features/avatar';
import { OnboardingFormSkeleton } from '../OnboardingForm.skeleton';
import { getIsLoadingState } from '../../model/selectors/getLoadingProfileStatus';
import { getLazyStudentProfile } from '../../api/onboardingApi';
import { StudentPersonalInfoForm } from '../StudentPersonalInfoForm/StudentPersonalInfoForm';
import { StudentScientificPorfolioForm } from '../ScientificPortfolioForm/ScientificPortfolioForm';
import { StudentSearchStatusForm } from '../SearchStatusForm/SearchStatusForm';
import { getStudent } from '../../model/selectors/getStudent';
import { STATUS } from '@/shared/api/status';

interface StudentOnboardingProps {
    values: string[];
    id: string;
    onSuccess: (currentValue: string, nextValue?: string) => void;
    onRequestStart: () => void;
    onError: (value: string) => void;
    activeTabValue: string;
}

const StudentOnboarding = memo((props: StudentOnboardingProps) => {
    const { values, id, onSuccess, onRequestStart, onError, activeTabValue } = props;

    const profileStatus = useSelector(getIsLoadingState);
    const student = useSelector(getStudent);

    const { data: avatarUrl, isLoading: isAvatarLoading } = useGetAvatar();
    const [getStudentProfile] = getLazyStudentProfile();

    useEffect(() => {
        getStudentProfile();
    }, [getStudentProfile]);

    if (profileStatus === STATUS.initial || profileStatus === STATUS.request) {
        return <OnboardingFormSkeleton />;
    }

    return (
        <>
            {student !== undefined && activeTabValue === values[0] && (
                <Stack direction="row" spacing={4} sx={{ flex: 1 }}>
                    <UploadAvatar isAvatarGetting={isAvatarLoading} url={avatarUrl} />
                    <StudentPersonalInfoForm
                        id={id}
                        onError={() => onError(values[0])}
                        onSuccess={() => onSuccess(values[0], values[1])}
                        onRequestStart={onRequestStart}
                        initialValues={student?.personalInfo}
                    />
                </Stack>
            )}
            {activeTabValue === values[1] && (
                <StudentScientificPorfolioForm
                    id={id}
                    onError={() => onError(values[1])}
                    onSuccess={() => onSuccess(values[1], values[2])}
                    onRequestStart={onRequestStart}
                    initialValues={student?.scientificPorfolio}
                />
            )}
            {activeTabValue === values[2] && (
                <StudentSearchStatusForm
                    id={id}
                    onError={() => onError(values[2])}
                    onSuccess={() => onSuccess(values[2])}
                    onRequestStart={onRequestStart}
                    initialValues={student?.studentStatus}
                />
            )}
        </>
    );
});

export default StudentOnboarding;
