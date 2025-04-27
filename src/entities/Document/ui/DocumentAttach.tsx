import { DocumentUploadButton } from '@/features/document/upload';
import { formatDate } from '@/shared/lib/helpers/formatDate';
import { BaseButton } from '@/shared/ui';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Paper, PaperProps, Stack, styled, Typography } from '@mui/material';

type DocumentAttachProps = {
    name: string;

    uploadDate?: Date;
    editable?: boolean;
};

const StyledPaper = styled(Paper)<PaperProps & { uploaded: string }>(({ uploaded, theme }) => ({
    borderColor: uploaded === 'true' ? theme.palette.primary.main : theme.palette.secondary.main,
    borderStyle: 'dashed',
    padding: [theme.spacing(3), theme.spacing(2)].join(' '),
    borderRadius: theme.spacing(1),
}));

export const DocumentAttach = (props: DocumentAttachProps) => {
    const { name, uploadDate, editable } = props;
    const isUploaded = Boolean(uploadDate);
    const color = isUploaded ? 'primary' : 'secondary';

    return (
        <StyledPaper component={Stack} uploaded={isUploaded.toString()}>
            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                    <DescriptionOutlinedIcon color={color} fontSize="large" />
                    <Stack>
                        <Typography>{name}</Typography>
                        <Typography color="secondary" variant="subtitle2">
                            {formatDate(uploadDate) || 'Не загружено'}
                        </Typography>
                    </Stack>
                </Stack>
                <Stack direction="row" spacing={1} alignItems="center">
                    {uploadDate && <BaseButton size="small">Скачать</BaseButton>}
                    {editable && <DocumentUploadButton name={name} />}
                </Stack>
            </Stack>
        </StyledPaper>
    );
};
