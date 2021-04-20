// React
import React, { FC } from 'react';

// Redux
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { toggleCollapseTerminal } from 'redux/slices/terminalSlice';

// Components
import { BottomTab } from 'components/BottomTab';

// type import
import { Apps } from 'types/apps';

// Styles
import styles from './style.module.css';
import { toggleCollapseSettings } from '../../redux/slices/settingsSlice';
import { setWindowActive } from '../../redux/slices/appsSlice';

// Types
type PropsType = {
  children?: never;
};

export const BottomPart: FC<PropsType> = () => {
  const apps = useSelector((state: RootState) => state.apps.apps);
  const isSettingsCollapsed = useSelector((state: RootState) => state.settings.isSettingsCollapsed);
  const isTerminalCollapsed = useSelector((state: RootState) => state.terminal.isTerminalCollapsed);
  const dispatch = useDispatch();

  const handleTerminalClick = () => {
    dispatch(toggleCollapseTerminal());
    if (isTerminalCollapsed) {
      dispatch(setWindowActive(Apps.Terminal));
    } else if (apps.indexOf(Apps.Terminal) === 0) {
      dispatch(setWindowActive(apps[1]));
    }
  };

  const handleSettingsClick = () => {
    dispatch(toggleCollapseSettings());
    if (isSettingsCollapsed) {
      dispatch(setWindowActive(Apps.Settings));
    } else if (apps.indexOf(Apps.Settings) === 0) {
      dispatch(setWindowActive(apps[1]));
    }
  };

  return (
    <div className={styles.container}>
      {apps.includes(Apps.Terminal) && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          className={apps.indexOf(Apps.Terminal) === 0 ? `${styles.isActive} ${styles.tab}` : styles.tab}
          onClick={handleTerminalClick}
        >
          <BottomTab title={Apps.Terminal} />
        </div>
      )}
      {apps.includes(Apps.Settings) && (
        // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
        <div
          className={apps.indexOf(Apps.Settings) === 0 ? `${styles.isActive} ${styles.tab}` : styles.tab}
          onClick={handleSettingsClick}
        >
          <BottomTab title={Apps.Settings} />
        </div>
      )}
    </div>
  );
};
