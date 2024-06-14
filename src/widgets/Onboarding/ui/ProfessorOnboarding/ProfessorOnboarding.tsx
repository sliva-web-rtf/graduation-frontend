import { memo, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Stack } from '@mui/material';

import { UploadAvatar, useGetAvatar } from '@/features/avatar';
import { OnboardingFormSkeleton } from '../OnboardingForm.skeleton';
import { getIsLoadingState } from '../../model/selectors/getLoadingProfileStatus';
import { STATUS } from '@/shared/api/status';
import { ProfessorPersonalInfoForm } from '../ProfessorPersonalInfoForm/ProfessorPersonalInfoForm';
import { getProfessor } from '../../model/selectors/getProfessor';
import { getLazyProfessorProfile } from '../../api/onboardingApi';

interface ProfessorOnboardingProps {
    values: string[];
    id: string;
    onSuccess: (currentValue: string, nextValue?: string) => void;
    onRequestStart: () => void;
    onError: (value: string) => void;
    activeTabValue: string;
}

const ProfessorOnboarding = memo((props: ProfessorOnboardingProps) => {
    const { values, id, onSuccess, onRequestStart, onError, activeTabValue } = props;

    const profileStatus = useSelector(getIsLoadingState);
    const professor = useSelector(getProfessor);

    const { data: avatarUrl, isLoading: isAvatarLoading } = useGetAvatar();
    const [getProfessorProfile] = getLazyProfessorProfile();

    useEffect(() => {
        getProfessorProfile();
    }, [getProfessorProfile]);

    if (profileStatus === STATUS.initial || profileStatus === STATUS.request) {
        return <OnboardingFormSkeleton />;
    }

    return (
        <>
            {professor !== undefined && activeTabValue === values[0] && (
                <Stack direction="row" spacing={4} sx={{ flex: 1 }}>
                    <UploadAvatar isAvatarGetting={isAvatarLoading} url={avatarUrl} />
                    <ProfessorPersonalInfoForm
                        id={id}
                        onError={() => onError(values[0])}
                        onSuccess={() => onSuccess(values[0], values[1])}
                        onRequestStart={onRequestStart}
                        initialValues={professor?.personalInfo}
                    />
                </Stack>
            )}
            {activeTabValue === values[1] && 123}
            {activeTabValue === values[2] && 456}
        </>
    );
});

export default ProfessorOnboarding;
