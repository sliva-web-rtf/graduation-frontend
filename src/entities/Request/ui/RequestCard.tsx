import { BaseButton, TopicChangeInfo } from '@/shared/ui';
import { Box, Paper, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import styles from './RequestCard.module.scss';

type RequestCardProps = {
    date: string;
    topicName: string;
    text: string;
    link: string;

    isOutgoing?: boolean;
    isHistory?: boolean;

    isTopicChange?: boolean;
    beforeTopicName?: string;
};

export const RequestCard = (props: RequestCardProps) => {
    const {
        date,
        topicName,
        text,
        link,
        isOutgoing = false,
        isHistory = false,
        isTopicChange = false,
        beforeTopicName = '',
    } = props;

    return (
        <Paper component={Stack} spacing={3} className={styles.card}>
            <Box className={styles.top}>
                <Stack spacing={1}>
                    <Typography variant="subtitle2" color="secondary">
                        {date}
                    </Typography>
                    <Typography className={styles.clamped}>{text}</Typography>
                    <Typography
                        component={NavLink}
                        to={link}
                        className={styles.clamped}
                        variant="bodyXS"
                        color="primary"
                    >
                        {topicName}
                    </Typography>
                </Stack>
                {!isHistory && (
                    <Stack direction="row" spacing={2} alignSelf="center">
                        <BaseButton>Отклонить</BaseButton>
                        {!isOutgoing && <BaseButton variant="contained">Принять</BaseButton>}
                    </Stack>
                )}
            </Box>
            {isTopicChange && <TopicChangeInfo before={beforeTopicName} after={topicName} />}
        </Paper>
    );
};
