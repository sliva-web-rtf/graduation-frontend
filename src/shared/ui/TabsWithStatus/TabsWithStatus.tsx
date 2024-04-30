import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { Box, Stack, Typography } from '@mui/material';
import classNames from 'classnames';
import { typedMemo } from 'shared/lib/helpers/typedMemo';
import { BaseButton } from '../Button/Button';
import styles from './TabsWIthStatus.module.scss';

type TabError<T> = {
    value: T;
    text: string;
};

interface TabsWithStatusProps<T> {
    values: T[];
    titles: string[];
    onChange: (value: T) => void;
    subTitles?: string[];
    errors?: TabError<T>[];
}

export const TabsWithStatus = typedMemo(
    <T extends string | number>({ values, titles, onChange, subTitles }: TabsWithStatusProps<T>) => (
        <Box role="tablist" className={styles.container}>
            {values.map((value, index) => (
                <BaseButton
                    role="tab"
                    // поменять
                    aria-selected={false}
                    sx={{ width: `calc(100% / ${values.length})` }}
                    type="button"
                    key={value}
                    className={classNames(styles.clearButton, styles.tab)}
                >
                    <PanoramaFishEyeIcon className={styles.icon} />
                    <Stack alignItems="start">
                        <Typography variant="h4">{titles[index]}</Typography>
                        {subTitles && <Typography variant="bodyXS">{subTitles[index]}</Typography>}
                    </Stack>
                </BaseButton>
            ))}
        </Box>
    ),
);
