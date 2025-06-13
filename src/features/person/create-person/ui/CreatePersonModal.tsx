import { Role, ROLES } from '@/entities/User';
import { capitalize } from '@/shared/lib/helpers/capitalized';
import { useSnackbar } from '@/shared/lib/hooks/useSnackbar';
import { BaseButton, BaseModal, OptionType } from '@/shared/ui';
import { Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';

type Props = {
    open: boolean;
    onClose: () => void;

    firstName?: string;
    lastName?: string;
    roles?: Role[];
    password?: string;

    supervisorLimits?: number;
    patronymic?: string;
    academicGroup?: OptionType;
};

export const CreatePersonModal = (props: Props) => {
    const { open, onClose, firstName, lastName, password, patronymic, roles, academicGroup, supervisorLimits } = props;
    const { showSnackbar, Snackbar } = useSnackbar();
    const { label: academicGroupName } = academicGroup || { Label: '' };

    const rolesText = roles?.map((role) => ROLES[role]).join(', ');

    const firstNameInLogin = firstName ? capitalize(firstName.trim()) : '';
    const lastNameInLogin = lastName ? capitalize(lastName.trim()) : '';
    const patronymicInLogin = patronymic ? capitalize(patronymic.trim()) : '';
    const academicGroupInLogin = academicGroupName?.replace('-', '');

    const login = `${firstNameInLogin}${lastNameInLogin}${patronymicInLogin}${academicGroupInLogin}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(`Логин: ${login}\nПароль: ${password}`);
        showSnackbar('success', 'Данные скопированы в буфер обмена');
    };

    return (
        <BaseModal
            title="Пользователь создан"
            open={open}
            onClose={onClose}
            actionButton={
                <BaseButton variant="contained" onClick={handleCopy}>
                    Скопировать логин и пароль
                </BaseButton>
            }
            cancelButton={
                <BaseButton variant="outlined" onClick={onClose}>
                    Закрыть
                </BaseButton>
            }
        >
            <Stack spacing={2}>
                <TableContainer>
                    <Table size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={600}>Фамилия</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{firstNameInLogin}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={600}>Имя</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{lastNameInLogin}</Typography>
                                </TableCell>
                            </TableRow>

                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={600}>Отчество</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{patronymicInLogin}</Typography>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography fontWeight={600}>Роль</Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography>{rolesText}</Typography>
                                </TableCell>
                            </TableRow>

                            {academicGroupName && (
                                <TableRow>
                                    <TableCell>
                                        <Typography fontWeight={600}>Академическая группа</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{academicGroupName}</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                            {supervisorLimits && (
                                <TableRow>
                                    <TableCell>
                                        <Typography fontWeight={600}>Лимиты дипломников</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{supervisorLimits}</Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {Snackbar}
            </Stack>
        </BaseModal>
    );
};
