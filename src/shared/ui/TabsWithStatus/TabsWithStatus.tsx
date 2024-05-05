import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import { Box, Stack, Typography } from '@mui/material';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import DoneIcon from '@mui/icons-material/Done';
import classNames from 'classnames';
import { useCallback, useState } from 'react';
import { typedMemo } from 'shared/lib/helpers/typedMemo';
import styles from './TabsWIthStatus.module.scss';

interface TabsWithStatusProps<T extends string | number> {
    values: T[];
    titles: string[];
    activeValue: T;
    successValues: T[];
    subTitles?: string[];
    errors?: Partial<Record<T, string>>;
}

export const TabsWithStatus = typedMemo(
    <T extends string | number>({
        values,
        titles,
        subTitles,
        errors,
        activeValue,
        successValues,
    }: TabsWithStatusProps<T>) => {
        const [activeValueIndex, setActiveValueIndex] = useState(values.indexOf(activeValue));

        return (
            <Box role="tablist" className={styles.container}>
                {values.map((value, index) => {
                    const hasError = errors && errors[value] !== undefined;
                    const isSuccessValue = successValues.includes(value);

                    return (
                        <Box
                            role="tab"
                            aria-selected={value === activeValue}
                            sx={{ width: `calc(100% / ${values.length})` }}
                            key={value}
                            className={classNames(styles.clearButton, styles.tab, {
                                [styles.activeTab]: activeValueIndex >= index,
                                [styles.errorTab]: hasError,
                            })}
                        >
                            {isSuccessValue && !hasError && <DoneIcon sx={{ fill: 'var(--success-color)' }} />}
                            {(activeValueIndex === index || hasError) && !isSuccessValue && (
                                <DataUsageIcon
                                    sx={{ fill: hasError ? 'var(--error-color)' : 'var(--primary-color)' }}
                                />
                            )}
                            {activeValueIndex < index && !hasError && !isSuccessValue && (
                                <PanoramaFishEyeIcon className={styles.icon} />
                            )}
                            <Stack alignItems="start">
                                <Typography variant="h4">{titles[index]}</Typography>
                                {subTitles && (
                                    <Typography
                                        variant="bodyXS"
                                        className={classNames(styles.tabDescription, {
                                            [styles.errorTabDescription]: hasError,
                                            [styles.successTabDescription]: isSuccessValue,
                                        })}
                                    >
                                        {hasError ? errors[value] : subTitles[index]}
                                    </Typography>
                                )}
                            </Stack>
                        </Box>
                    );
                })}
            </Box>
        );
    },
);
