import { RoutePathType } from '@/app/providers/Router';
import { StudentStatus, StudentStatusRus } from '@/entities/Person';
import { TopicStatus, TopicStatusRus } from '@/entities/Topic';
import {
    getColorByDocumentStatus,
    getColorByIsCommandStatus,
    getColorByResultStatus,
    getColorByStudentsStatus,
    getColorByTopicStatus,
} from '@/shared/lib/helpers/getColorByStatus';
import { getInfoPagePath } from '@/shared/lib/helpers/getInfoPagePath';
import { DocumentStatus, DocumentStatusRus, ResultStatus, ResultStatusRus } from '@/shared/lib/types/statuses';
import { BaseChip, BaseTimeField } from '@/shared/ui';
import { Box, InputBase, InputBaseProps, Paper, Popper, Stack, Tooltip, Typography } from '@mui/material';
import { GridRenderCellParams, GridRenderEditCellParams, GridValidRowModel, useGridApiContext } from '@mui/x-data-grid';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Entity = {
    id?: string;
    text?: string;
};

const getLinkCell = (params: Entity, route: RoutePathType) => {
    if (!params?.id || !params?.text) return null;

    const { id, text } = params;
    const path = getInfoPagePath(route, id);

    return <Link to={path}>{text || text}</Link>;
};

export const renderLinkCell =
    (route: RoutePathType, textKey: keyof GridValidRowModel) => (params: GridRenderCellParams) =>
        getLinkCell(
            {
                id: params.value?.id,
                text: params.value?.[textKey],
            },
            route,
        );

export const renderTopicStatusCell = (params: GridRenderCellParams<GridValidRowModel, TopicStatus>) => {
    const { value } = params;
    const color = getColorByTopicStatus(value);

    return <BaseChip label={(value && TopicStatusRus[value]) ?? TopicStatusRus.getUnknown} color={color} />;
};

export const renderStudentStatusCell = (params: GridRenderCellParams<GridValidRowModel, StudentStatus>) => {
    const { value } = params;
    const color = getColorByStudentsStatus(value);

    return <BaseChip label={(value && StudentStatusRus[value]) ?? StudentStatusRus.getUnknown} color={color} />;
};

export const renderResultCell = (params: GridRenderCellParams<GridValidRowModel, ResultStatus>) => {
    const { value } = params;
    const color = getColorByResultStatus(value);

    return <BaseChip label={(value && ResultStatusRus[value]) ?? ResultStatusRus.getUnknown} color={color} />;
};

export const rendeIsCommandCell = (params: GridRenderCellParams<GridValidRowModel, boolean>) => {
    const { value } = params;
    const color = getColorByIsCommandStatus(value);

    return <BaseChip label={value ? 'Да' : 'Нет'} color={color} />;
};

export const renderCommentCell = (params: GridRenderCellParams<GridValidRowModel, string>) => {
    const { value } = params;

    if (!value) {
        return null;
    }

    return (
        <Stack justifyContent="center" height="100%">
            <Tooltip title={value}>
                <Typography>{value}</Typography>
            </Tooltip>
        </Stack>
    );
};

export const renderDocCell = (params: GridRenderCellParams<GridValidRowModel, DocumentStatus>) => {
    const { value } = params;
    const backgroundColor = getColorByDocumentStatus(value);

    return (
        <Tooltip title={DocumentStatusRus[value ?? '']}>
            <Stack alignItems="center" justifyContent="center" height="100%">
                <Box sx={{ backgroundColor, width: 16, height: 16 }} />
            </Stack>
        </Tooltip>
    );
};

export const RenderEditTextareaCell = (props: GridRenderEditCellParams<any, string>) => {
    const { id, field, value, colDef, hasFocus } = props;
    const [valueState, setValueState] = useState(value);
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();
    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);
    const apiRef = useGridApiContext();

    useLayoutEffect(() => {
        if (hasFocus && inputRef) {
            inputRef.focus();
        }
    }, [hasFocus, inputRef]);

    const handleRef = useCallback((el: HTMLElement | null) => {
        setAnchorEl(el);
    }, []);

    const handleChange = useCallback<NonNullable<InputBaseProps['onChange']>>(
        (event) => {
            const newValue = event.target.value;
            setValueState(newValue);
            apiRef.current.setEditCellValue({ id, field, value: newValue, debounceMs: 300 }, event);
        },
        [apiRef, field, id],
    );

    return (
        <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
            <div
                ref={handleRef}
                style={{
                    height: 1,
                    width: colDef.computedWidth,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                }}
            />
            {anchorEl && (
                <Popper open anchorEl={anchorEl} placement="bottom-start">
                    <Paper elevation={1} sx={{ p: 1, minWidth: colDef.computedWidth }}>
                        <InputBase
                            multiline
                            rows={4}
                            value={valueState}
                            sx={{ textarea: { resize: 'vertical' }, width: '100%' }}
                            onChange={handleChange}
                            inputRef={(ref) => setInputRef(ref)}
                        />
                    </Paper>
                </Popper>
            )}
        </div>
    );
};

export const RenderEditTimeCell = (props: GridRenderEditCellParams<any, string>) => {
    const { id, field, value, hasFocus } = props;
    const apiRef = useGridApiContext();
    const [valueState, setValueState] = useState(value);
    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

    useLayoutEffect(() => {
        if (hasFocus && inputRef) {
            inputRef.focus();
        }
    }, [hasFocus, inputRef]);

    const handleChange = useCallback(
        (newValue: string) => {
            setValueState(newValue);
            apiRef.current.setEditCellValue({ id, field, value: newValue, debounceMs: 300 });
        },
        [apiRef, field, id],
    );

    return <BaseTimeField value={valueState} onChange={handleChange} inputRef={(ref: any) => setInputRef(ref)} />;
};
