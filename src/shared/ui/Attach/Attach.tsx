import AttachFileIcon from '@mui/icons-material/AttachFile';
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
    },
    span: {
        cursor: 'pointer',
    },
    '.MuiOutlinedInput-notchedOutline': {
        borderColor: theme.palette.primary.main,
        borderStyle: 'dashed',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: '#1e88e5 !important',
    },

    '&:hover .Mui-error .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.error.main} !important`,
    },
    '&:hover .Mui-error.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: `${theme.palette.error.main} !important`,
    },
}));

export const Attach = (props: MuiFileInputProps) => (
    <StyledAttach
        placeholder=".pdf, .doc, .docx"
        inputProps={{ accept: '.pdf, .doc, .docx' }}
        // eslint-disable-next-line react/jsx-no-duplicate-props
        InputProps={{
            startAdornment: <AttachFileIcon color="primary" />,
        }}
        clearIconButtonProps={{
            title: 'Удалить файл',
            children: <DeleteIcon fontSize="small" color="error" />,
        }}
        {...props}
    />
);
