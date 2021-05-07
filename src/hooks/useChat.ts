// React, Redux
import { useDispatch, useSelector } from 'react-redux';
import { closeChat, openChat, toggleCollapseChat } from 'redux/slices/chatSlice';
import { addWindow, deleteWindow, setWindowActive } from 'redux/slices/appsSlice';
import { RootState } from 'redux/store';

// Types
import { Apps } from 'types/apps';

const useChat = () => {
  const apps = useSelector((state: RootState) => state.apps.apps);
  const isChatCollapsed = useSelector((state: RootState) => state.chat.isChatCollapsed);
  const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);

  const dispatch = useDispatch();

  const handleChatCollapseToggle = () => {
    if (isChatCollapsed) {
      dispatch(setWindowActive(Apps.Chat));
    } else if (apps.indexOf(Apps.Chat) === 0) {
      dispatch(setWindowActive(apps[1]));
    }
    dispatch(toggleCollapseChat());
  };

  const handleOpenChat = () => {
    if (isChatCollapsed && isChatOpen) {
      dispatch(toggleCollapseChat());
      dispatch(setWindowActive(Apps.Chat));
    } else if (!isChatOpen) {
      dispatch(openChat());
      dispatch(addWindow(Apps.Chat));
    }
  };

  const handleCloseChat = () => {
    if (!isChatOpen) {
      return;
    }
    dispatch(closeChat());
    dispatch(deleteWindow(Apps.Chat));
  };

  return {
    handleChatCollapseToggle,
    handleOpenChat,
    handleCloseChat,
  };
};

export { useChat };
