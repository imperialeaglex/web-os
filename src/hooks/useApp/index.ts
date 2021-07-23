// React, redux
import { useDispatch, useSelector } from 'react-redux';
import { addWindow, deleteWindow, setWindowActive } from 'src/redux/slices/appsSlice';
import { closeApp, openApp, toggleCollapseApp } from 'src/redux/slices/appsSlicesBus/appsStateSlice';
import { RootState } from 'src/redux/store';

// Types
import { Apps } from 'src/types/apps';

const useApp = (type: Apps) => {
  const apps = useSelector((state: RootState) => state.apps.apps);
  const isCollapsed = useSelector((state: RootState) => state.appsState.apps[type].isCollapsed);
  const isOpened = useSelector((state: RootState) => state.appsState.apps[type].isOpened);

  const dispatch = useDispatch();

  const getAppIndex = () => apps.indexOf(type);

  const handleToggleCollapse = () => {
    if (isCollapsed) {
      dispatch(setWindowActive(type));
    } else if (getAppIndex() === 0) {
      dispatch(setWindowActive(apps[1]));
    }
    dispatch(toggleCollapseApp({ type }));
  };

  const handleOpen = () => {
    if (isCollapsed && isOpened) {
      dispatch(toggleCollapseApp({ type }));
      dispatch(setWindowActive(type));
    } else if (!isOpened) {
      dispatch(openApp({ type }));
      dispatch(addWindow(type));
    }
  };

  const handleClose = () => {
    if (!isOpened) {
      return;
    }
    dispatch(closeApp({ type }));
    dispatch(deleteWindow(type));
  };

  const isIncludeApp = () => apps.includes(type);

  return {
    handleClose,
    handleOpen,
    handleToggleCollapse,
    isIncludeApp,
    getAppIndex,
  };
};

export { useApp };
