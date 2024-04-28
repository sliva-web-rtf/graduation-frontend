import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { AccordionSummary, AccordionSummaryProps, styled, Typography } from '@mui/material';
import { ReactNode } from 'react';

export const BaseAccordionSummary = styled((props: AccordionSummaryProps & { children: ReactNode }) => (
    <AccordionSummary expandIcon={<KeyboardArrowDownRoundedIcon />} {...props}>
        <Typography variant="h4">{props.children}</Typography>
    </AccordionSummary>
))(() => ({
    '&': {
        borderTop: '1px solid #F2F4F8',
    },
    '&.Mui-expanded': {
        background: '#F2F4F8',
    },

    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
}));
