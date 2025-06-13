import { StageSelect } from '@/entities/Stage';
import { BaseButton } from '@/shared/ui';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import MoveDownOutlinedIcon from '@mui/icons-material/MoveDownOutlined';
import { SelectChangeEvent, Stack } from '@mui/material';
import { memo, useState } from 'react';
import { StageCopyModal } from './StageCopyModal';

export const StageCopy = memo(() => {
    const [open, setOpen] = useState(false);
    const [stageFrom, setFromStage] = useState<string | null>(null);
    const [stageTo, setToStage] = useState<string | null>(null);

    const isCopyDisabled = !stageFrom || !stageTo || stageFrom === stageTo;

    const handleChangeFromStage = (e: SelectChangeEvent<any>) => {
        setFromStage(e.target.value);
    };

    const handleChangeToStage = (e: SelectChangeEvent<any>) => {
        setToStage(e.target.value);
    };

    const handleOpenModal = () => {
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <>
            <Stack spacing={4} alignItems="flex-start">
                <Stack direction="row" spacing={2} alignItems="center" width="100%">
                    <StageSelect
                        label="Исходный этап"
                        helperText="Из какого этапа копировать"
                        value={stageFrom}
                        onChange={handleChangeFromStage}
                    />
                    <ArrowCircleRightOutlinedIcon color="primary" sx={{ position: 'relative', top: '-10px' }} />
                    <StageSelect
                        label="Целевой этап"
                        helperText="В какой этап копировать"
                        value={stageTo}
                        onChange={handleChangeToStage}
                    />
                </Stack>
                <BaseButton
                    variant="contained"
                    startIcon={<MoveDownOutlinedIcon />}
                    onClick={handleOpenModal}
                    disabled={isCopyDisabled}
                >
                    Копировать
                </BaseButton>
            </Stack>
            <StageCopyModal
                open={open}
                onClose={handleCloseModal}
                stageFrom={stageFrom}
                stageTo={stageTo}
                disabled={isCopyDisabled}
            />
        </>
    );
});
