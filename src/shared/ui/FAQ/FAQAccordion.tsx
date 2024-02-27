import { Accordion, AccordionProps, styled } from '@mui/material';
import { grey } from '@mui/material/colors';

export const FAQAccordion = styled(Accordion)<AccordionProps>(() => ({
  '&': {
    border: '1px solid',
    borderColor: grey['400'],
    borderRadius: 0,
  }
  ,
}));
