import { calculateProcentProgress } from '@/shared/lib/helpers/calculateProcentProgress';
import { LinearProgress, linearProgressClasses, LinearProgressProps, styled } from '@mui/material';
import { useEffect, useState } from 'react';

interface StyledLinearProgressProps {
    hasData: boolean;
}

export const StyledLinearProgress = styled(LinearProgress, {
    shouldForwardProp: (props) => props !== 'hasData',
})<StyledLinearProgressProps>(({ theme, hasData }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: hasData ? '#DDD' : 'transparent',
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 5,
        backgroundColor: theme.palette.primary,
    },
    [`& .${linearProgressClasses.dashed}`]: {
        backgroundPositionY: '-10px !important',
        backgroundImage: 'radial-gradient(#DDD 0%, #DDD 16%, transparent 42%)',
    },
}));

// todo:
// Перенести в будущую компоненту часть функционала

const datesFromBackend: { title: string; start: string; end: string }[] = [
    {
        title: '1 этап',
        start: '2025-11-01T11:19:20.310Z',
        end: '2025-11-30T11:19:20.310Z',
    },
    {
        title: '2 этап',
        start: '2025-12-01T11:19:20.310Z',
        end: '2025-12-31T11:19:20.310Z',
    },
    {
        title: '3 этап',
        start: '2025-01-01T11:19:20.310Z',
        end: '2025-01-15T11:19:20.310Z',
    },
    {
        title: '4 этап',
        start: '2025-01-16T11:19:20.310Z',
        end: '2025-01-31T11:19:20.310Z',
    },
];

export const LinearStagesProgress = (props: LinearProgressProps) => {
    const [progress, setProgress] = useState(0);
    const [hasData, setHasData] = useState(false);

    useEffect(() => {
        if (datesFromBackend) {
            setProgress(calculateProcentProgress(datesFromBackend));
            setHasData(true);
        }
    }, []);

    return (
        <StyledLinearProgress
            variant={hasData ? 'determinate' : 'buffer'}
            hasData={hasData}
            {...props}
            value={progress}
            valueBuffer={hasData ? 0 : 100}
        />
    );
};
