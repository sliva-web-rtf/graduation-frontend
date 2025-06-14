import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import { styled } from '@mui/material';
import { MuiFileInput, MuiFileInputProps } from 'mui-file-input';

export const StyledAttach = styled(MuiFileInput)<MuiFileInputProps>(({ theme }) => ({
    '& .MuiInputBase-root': {
        borderRadius: theme.spacing(1),
        backgroundColor: theme.palette.background.paper,
        fontWeight: 600,
        color: theme.palette.primary.main,
        padding: `${theme.spacing(3)} ${theme.spacing(2)}`,
        cursor: 'pointer',
        borderColor: theme.palette.primary.main,
        borderStyle: 'dashed',

        '&::before, &::after': {
            display: 'none',
        },
    },
    span: {
        cursor: 'pointer',
        fontWeight: 500,
    },
}));

export const Attach = (props: MuiFileInputProps) => (
    <StyledAttach
        placeholder=".pdf, .doc, .docx"
        inputProps={{ accept: '.pdf, .doc, .docx' }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{
            startAdornment: <CloudUploadIcon color={props?.value ? 'primary' : 'secondary'} />,
        }}
        clearIconButtonProps={{
            title: 'Удалить файл',
            children: <DeleteIcon fontSize="small" color="error" />,
        }}
        {...props}
    />
);
