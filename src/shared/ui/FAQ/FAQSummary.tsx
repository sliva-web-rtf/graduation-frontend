import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import {
  AccordionSummary, AccordionSummaryProps, styled, Typography,
} from '@mui/material';
import { ReactNode, useState } from 'react';

export const FAQSummary = styled((props: AccordionSummaryProps & { children: ReactNode }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => setExpanded(!expanded);

  return (
    <AccordionSummary
      expandIcon={expanded ? <RemoveRoundedIcon /> : <AddRoundedIcon />}
      onClick={handleExpand}
      {...props}
    >
      <Typography variant="h3">{props.children}</Typography>
    </AccordionSummary>
  );
})(() => ({
  '&': {
    borderTop: '1px solid #F2F4F8',
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(180deg)',
  },
}));
