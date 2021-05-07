import { configureStore } from '@reduxjs/toolkit';
import themeSlice from 'redux/slices/themeSlice';
import localeSlice from 'redux/slices/localeSlice';
import terminalSlice from 'redux/slices/terminalSlice';
import settingsSlice from 'redux/slices/settingsSlice';
import appsSlice from 'redux/slices/appsSlice';
import calculatorSlice from 'redux/slices/calculatorSlice';
import toDoSlice from './slices/toDoSlice';
import userSlice from './slices/userSlice';
import chatSlice from './slices/chatSlice';

const store = configureStore({
  reducer: {
    theme: themeSlice,
    locale: localeSlice,
    terminal: terminalSlice,
    settings: settingsSlice,
    apps: appsSlice,
    calculator: calculatorSlice,
    toDo: toDoSlice,
    user: userSlice,
    chat: chatSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
