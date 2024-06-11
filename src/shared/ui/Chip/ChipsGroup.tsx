import { Stack, Typography } from '@mui/material';
import { BaseChip } from 'shared/ui';
import { memo, useEffect, useRef, useState } from 'react';

interface ChipsGroupProps {
    readonly chips: Array<string>;
}

export const ChipsGroup = memo((props: ChipsGroupProps) => {
    const { chips } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const [visibleChips, setVisibleChips] = useState(chips);
    const [hiddenCount, setHiddenCount] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (!containerRef.current) return;

            const containerWidth = containerRef.current.offsetWidth;
            let totalWidth = 0;
            let visibleChipsCount = 0;

            for (let i = 0; i < chips.length; i += 1) {
                const chipElement = containerRef.current.children[i] as HTMLElement;
                const chipWidth = chipElement?.offsetWidth ?? 0;

                if (totalWidth + chipWidth > containerWidth - 80) {
                    break;
                }

                totalWidth += chipWidth;
                visibleChipsCount += 1;
            }

            setVisibleChips(chips.slice(0, visibleChipsCount));
            setHiddenCount(chips.length - visibleChipsCount);
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [chips]);

    return (
        <Stack direction="row" gap={1} ref={containerRef}>
            {visibleChips.map((item) => (
                <BaseChip key={item} variant="outlined" label={item} />
            ))}
            {hiddenCount > 0 && (
                <Typography variant="subtitle2" color="secondary" alignSelf="center">
                    Eще {hiddenCount}...
                </Typography>
            )}
        </Stack>
    );
});
