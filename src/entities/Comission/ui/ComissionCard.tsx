import { DeleteCommissionButton } from '@/features/comission/delete-commision';
import { EditCommissionButton } from '@/features/comission/edit-commision';
import { BaseChip } from '@/shared/ui';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    IconButton,
    Menu,
    Stack,
    styled,
    Typography,
} from '@mui/material';
import { MouseEvent, useCallback, useState } from 'react';
import { CommissionModel } from '../model';

type Props = Omit<CommissionModel, 'expertsNames'>;
type CommissionCardMenuProps = {
    commissionId: string;
    commissionName: string;
};

const StyledAccordion = styled(Accordion)(({ theme }) => ({
    '&.MuiAccordion-gutters': {
        borderRadius: theme.spacing(2),
    },
    '&.MuiAccordion-gutters::before': {
        backgroundColor: 'transparent',
    },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
    borderRadius: theme.spacing(2),
    height: theme.spacing(12),
}));

const CommissionCardMenu = (props: CommissionCardMenuProps) => {
    const { commissionId, commissionName } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    };
    const handleClose = useCallback((event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setAnchorEl(null);
    }, []);

    return (
        <>
            <IconButton onClick={handleOpen}>
                <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <EditCommissionButton commissionId={commissionId} />
                <DeleteCommissionButton
                    commissionId={commissionId}
                    commissionName={commissionName}
                    handleCloseMenu={handleClose}
                />
            </Menu>
        </>
    );
};
export const CommissionCard = (props: Props) => {
    const { id, name, secretaryName, chairpersonName = 'Нет данных', academicGroups } = props;

    return (
        <StyledAccordion>
            <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    width="100%"
                    spacing={4}
                    pr={2}
                >
                    <Stack spacing={1}>
                        <Typography variant="body2" fontWeight={600}>
                            {name}
                        </Typography>
                        <Stack direction="row" spacing={2}>
                            <BaseChip label={`Секретарь: ${secretaryName}`} color="success" />
                            <BaseChip label={`Председатель: ${chairpersonName}`} />
                        </Stack>
                    </Stack>
                    <CommissionCardMenu commissionId={id} commissionName={name} />
                </Stack>
            </StyledAccordionSummary>
            <AccordionDetails>
                <Stack direction="row" spacing={2} justifyContent="space-between">
                    <Stack direction="row" spacing={1}>
                        {academicGroups?.map((group) => <BaseChip key={group} label={group} color="info" />)}
                        {/* <CheckExpertsButton comissionId={id} comissionName={name} />
                        <CheckStudentsButton comissionId={id} comissionName={name} />
                        <СheckGroupsButton comissionId={id} comissionName={name} /> */}
                    </Stack>
                </Stack>
            </AccordionDetails>
        </StyledAccordion>
    );
};
