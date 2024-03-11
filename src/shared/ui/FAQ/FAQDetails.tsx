import {
  AccordionDetails, AccordionDetailsProps, styled, Typography,
} from '@mui/material';
import { ReactNode } from 'react';

export const FAQDetails = styled((props: AccordionDetailsProps & { children: ReactNode }) => (
  <AccordionDetails {...props}>
    <Typography variant="subtitle1" component="p">{props.children}</Typography>
  </AccordionDetails>
))(() => ({
  '&': {},
}));
