import { RoutePathType } from '@/app/providers/Router';
import { StudentStatus, StudentStatusRus } from '@/entities/Person';
import { useGetSupervisorsQuery } from '@/entities/Person/api/personApi';
import { useGetTopicRolesQuery } from '@/entities/Roles/api';
import { TopicStatus, TopicStatusRus } from '@/entities/Topic';
import {
    getColorByDocumentStatus,
    getColorByFormatingReviewStatus,
    getColorByIsCommandStatus,
    getColorByMovementStatus,
    getColorByResultStatus,
    getColorByStudentsStatus,
    getColorByTopicStatus,
} from '@/shared/lib/helpers/getColorByStatus';
import { getInfoPagePath } from '@/shared/lib/helpers/getInfoPagePath';
import {
    DocumentStatus,
    DocumentStatusRus,
    FormattingReviewStatus,
    FormattingReviewStatusRus,
    IsCommandStatus,
    IsCommandStatusRus,
    MovementStatus,
    MovementStatusRus,
    ResultStatus,
    ResultStatusRus,
} from '@/shared/lib/types/statuses';
import { BaseChip, BaseTimeField } from '@/shared/ui';
import { BaseAutocomplete } from '@/shared/ui/Autocomplete/Autocomplete';
import { Circle } from '@mui/icons-material';
import { InputBase, InputBaseProps, Paper, Popper, Stack, Tooltip, Typography } from '@mui/material';
import { GridRenderCellParams, GridRenderEditCellParams, GridValidRowModel, useGridApiContext } from '@mui/x-data-grid';
import React, { useCallback, useLayoutEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DocumentData, StudentRowModel } from '../model';

type Entity = {
    id?: string;
    text?: string;
};

const LinkCell = (props: { params: Entity; route: RoutePathType }) => {
    const { params, route } = props;
    const { id, text } = params || {};

    const handleClick = (e: React.MouseEvent) => {
        if (!e.metaKey) {
            e.preventDefault();
        }
    };

    if (!id) {
        return null;
    }

    const path = getInfoPagePath(route, id);

    return (
        <Tooltip title={text}>
            <Link to={path} target="_blank" onClick={handleClick}>
                {text}
            </Link>
        </Tooltip>
    );
};

export const renderLinkCell =
    (route: RoutePathType, textKey: keyof GridValidRowModel) => (params: GridRenderCellParams) =>
        LinkCell({
            params: {
                id: params.value?.id,
                text: params.value?.[textKey],
            },
            route,
        });

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

export const renderMovementStatusCell = (
    params: GridRenderCellParams<GridValidRowModel, StudentRowModel['commission']>,
) => {
    const { value } = params;
    const { name, movementStatus = MovementStatus.Default } = value ?? {
        name: 'Не назначена',
        movementStatus: MovementStatus.Default,
    };

    const color = getColorByMovementStatus(movementStatus);
    const title = [MovementStatusRus[movementStatus], name].filter(Boolean).join(', ');

    return (
        <Tooltip title={title}>
            <Circle sx={{ width: 16, height: 16, color }} />
        </Tooltip>
    );
};

export const renderFormatingReviewResultCell = (
    params: GridRenderCellParams<GridValidRowModel, FormattingReviewStatus>,
) => {
    const { value } = params;
    const color = getColorByFormatingReviewStatus(value);

    return (
        <BaseChip
            label={(value && FormattingReviewStatusRus[value]) ?? FormattingReviewStatusRus.getUnknown}
            color={color}
        />
    );
};

export const renderIsCommandCell = (params: GridRenderCellParams<GridValidRowModel, IsCommandStatus>) => {
    const { value } = params;
    const color = getColorByIsCommandStatus(value);
    const label = value ? IsCommandStatusRus[value] : IsCommandStatusRus.getUnknown;

    return <BaseChip label={label} color={color} />;
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

export const renderDocCell = (params: GridRenderCellParams<GridValidRowModel, DocumentData>) => {
    const { value } = params;
    const { status } = value ?? {};

    const color = getColorByDocumentStatus(status);

    return (
        <Tooltip title={DocumentStatusRus[status ?? DocumentStatus.Empty]}>
            <Circle sx={{ width: 16, height: 16, color }} />
        </Tooltip>
    );
};

export const RenderEditTextareaCell = (props: GridRenderEditCellParams<any, string>) => {
    const { id, field, value, colDef, hasFocus } = props;
    const [valueState, setValueState] = useState(value ?? '');
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

    const handleChange = useCallback(
        (newValue: string) => {
            setValueState(newValue);
            apiRef.current.setEditCellValue({ id, field, value: newValue, debounceMs: 300 });
        },
        [apiRef, field, id],
    );

    useLayoutEffect(() => {
        if (hasFocus && inputRef) {
            inputRef.focus();
        }
    }, [hasFocus, inputRef]);

    return <BaseTimeField value={valueState} onChange={handleChange} inputRef={(ref: any) => setInputRef(ref)} />;
};

export const RenderRoleEditCell = (props: GridRenderEditCellParams<any, string>) => {
    const { id, field, value, hasFocus } = props;
    const apiRef = useGridApiContext();
    const { isFetching, data } = useGetTopicRolesQuery();
    const [valueState, setValueState] = useState(value);
    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

    const handleChange = useCallback(
        (_: any, newValue: string) => {
            setValueState(newValue);
            apiRef.current.setEditCellValue({ id, field, value: newValue });
        },
        [apiRef, field, id],
    );

    useLayoutEffect(() => {
        if (hasFocus && inputRef) {
            inputRef.focus();
        }
    }, [hasFocus, inputRef]);

    return (
        <BaseAutocomplete
            freeSolo={false}
            forcePopupIcon={false}
            inputRef={(ref: any) => setInputRef(ref)}
            options={data ?? []}
            loading={isFetching}
            value={valueState}
            onChange={handleChange}
            sx={{
                '.MuiInputBase-root': {
                    padding: '4px',
                },
                '.MuiOutlinedInput-notchedOutline': {
                    border: '0 !important',
                },
            }}
        />
    );
};

export const RenderSupervisorEditCell = (
    props: GridRenderEditCellParams<any, { value: string; label: string } | null>,
) => {
    const { id, field, value, hasFocus } = props;
    const apiRef = useGridApiContext();
    const { isFetching, data } = useGetSupervisorsQuery();
    const [valueState, setValueState] = useState(value);
    const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

    const handleChange = useCallback(
        (_: any, newValue: { value: string; label: string }) => {
            setValueState(newValue);
            apiRef.current.setEditCellValue({ id, field, value: newValue });
        },
        [apiRef, field, id],
    );

    useLayoutEffect(() => {
        if (hasFocus && inputRef) {
            inputRef.focus();
        }
    }, [hasFocus, inputRef]);

    return (
        <BaseAutocomplete
            freeSolo={false}
            forcePopupIcon={false}
            isOptionEqualToValue={(option, value) => option.value === value}
            options={data ?? []}
            loading={isFetching}
            value={valueState}
            onChange={handleChange}
            inputRef={(ref: any) => setInputRef(ref)}
            sx={{
                '.MuiInputBase-root': {
                    padding: '4px',
                },
                '.MuiOutlinedInput-notchedOutline': {
                    border: '0 !important',
                },
            }}
        />
    );
};
