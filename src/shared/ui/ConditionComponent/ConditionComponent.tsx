import { useSelector } from 'react-redux';
import { PersonalData } from '@/widgets/PersonalData';
import { getProfileOption } from '@/widgets/Profile';
import { ProfileOption } from '@/widgets/Profile/model/types/profileOption';
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
