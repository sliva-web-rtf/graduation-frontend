import React, { memo, useState } from 'react';
import { Box, Stack } from '@mui/material';
import { BaseSearch } from 'shared/ui/Search/Search';
import { BaseToggleButtonGroup } from 'features/ToggleButtonGroup';
import { ThemesActions } from 'features/ThemesActions';
import styles from './CatalogSearch.module.scss';
import { ToggleOptions } from '../model/toggleOptions';

export const CatalogSearch = memo(() => {
  const [selectedOption, setSelectedOption] = useState<ToggleOptions>(ToggleOptions.Supervisors);

  return (
    <Stack spacing={4}>
      <Box className={styles.inputs}>
        <BaseSearch placeholder="Поиск по ключевым словам" />
        <BaseSearch placeholder="Область науки и технологий" />
      </Box>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <BaseToggleButtonGroup
          value={selectedOption}
          setAlignment={setSelectedOption}
          options={Object.values(ToggleOptions)}
        />
        {selectedOption === ToggleOptions.Themes && <ThemesActions />}
      </Stack>
    </Stack>
  );
});
