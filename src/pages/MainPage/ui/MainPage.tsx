import { Box } from '@mui/material';
import { BaseButton } from '@/shared/ui/Button/Button';
import { BaseField } from '@/shared/ui/Field/Field';
import { BaseAccordion } from '@/shared/ui/Accordion/Accordion';
import { BaseAccordionSummary } from '@/shared/ui/Accordion/AccordionSummary';
import { BaseAccordionDetails } from '@/shared/ui/Accordion/AccordionDetails';
import { FAQSummary } from '@/shared/ui/FAQ/FAQSummary';
import { FAQDetails } from '@/shared/ui/FAQ/FAQDetails';
import { FAQAccordion } from '@/shared/ui/FAQ/FAQAccordion';

const MainPage = () => (
    <Box sx={{ padding: '8px' }}>
        <BaseField multiline />
        <BaseButton variant="shadowed">123</BaseButton>
        <BaseAccordion>
            <BaseAccordionSummary>Title</BaseAccordionSummary>
            <BaseAccordionDetails>Text here</BaseAccordionDetails>
        </BaseAccordion>
        <FAQAccordion>
            <FAQSummary>Question</FAQSummary>
            <FAQDetails>Answer</FAQDetails>
        </FAQAccordion>
        Main
    </Box>
);

export default MainPage;
