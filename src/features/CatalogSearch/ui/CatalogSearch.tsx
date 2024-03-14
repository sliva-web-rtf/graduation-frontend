import React, { memo, useState } from 'react';
import { Box } from '@mui/material';
import { BaseSearch } from 'shared/ui/Search/Search';
import { BaseToggleButtonGroup } from 'features/ToggleButtonGroup';
import { ThemesActions } from 'features/ThemesActions';
import styles from './CatalogSearch.module.scss';
import { ToggleOptions } from '../model/toggleOptions';

export const CatalogSearch = memo(() => {
  const [selectedOption, setSelectedOption] = useState<ToggleOptions>(ToggleOptions.Supervisors);

  return (
    <>
      <Box className={styles.catalogSearch}>
        <BaseSearch placeholder="Поиск по ключевым словам" />
        <BaseSearch placeholder="Область науки и технологий" />
      </Box>
      <Box className={styles.buttonsWrapper}>
        <BaseToggleButtonGroup
          value={selectedOption}
          setAlignment={setSelectedOption}
          options={Object.values(ToggleOptions)}
        />
        {selectedOption === ToggleOptions.Themes && <ThemesActions />}
      </Box>
    </>
  );
});
