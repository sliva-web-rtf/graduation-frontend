import { useSelector } from 'react-redux';
import { getProfileOption, Profile } from '@/widgets/Profile';
import { ProfileOption } from '@/widgets/Profile/model/types/profileOption';
import { PersonalData } from '@/widgets/PersonalData';
import { RequestsSection } from '@/widgets/RequestsSection';

export const ConditionComponent = () => {
    const activeOption = useSelector(getProfileOption);
    if (activeOption === ProfileOption.PersonalData) {
        return <PersonalData />;
    }
    if (activeOption === ProfileOption.Requests) {
        return <RequestsSection />;
    }

    return null;
};
