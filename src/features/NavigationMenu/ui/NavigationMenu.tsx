import { NavLink, useLocation } from 'react-router-dom';
import { BaseTabs, BaseTab, TabLabel } from 'shared/ui/Tabs/Tabs';
import { TABS } from 'features/NavigationMenu/model/const';

const NavigationMenu = () => {
  const location = useLocation();
  return (
    <BaseTabs
      orientation="vertical"
      indicatorColor="primary"
      value={location.pathname}
    >
      {TABS.map((item) => (
        <BaseTab
          key={item.path}
          label={<TabLabel label={item.label} startIcon={item.startIcon} />}
          value={item.path}
          component={NavLink}
          to={item.path}
          startIcon={item.startIcon}
        />
      ))}
    </BaseTabs>
  );
};

export default NavigationMenu;
