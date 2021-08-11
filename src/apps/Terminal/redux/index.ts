/* eslint-disable no-param-reassign */

// Libraries
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv } from 'uuid';

// Types
import { BackgroundImage } from 'src/features/theme/types/backgroundImage';

export interface TerminalMessage {
  message: string;
  id: string;
}

const terminalHistory: TerminalMessage[] = [];
const terminalInputHistory: string[] = [];
const availableAutocomplete: string[] = [];

const commands = {
  firstLevelCommands: ['open', 'change', 'help', 'clear'],
  openCommands: ['calculator', 'chat', 'settings', 'simon', 'terminal', 'toDo', 'help'],
  changeCommands: ['language', 'theme'],
  changeLanguageCommands: ['ru', 'en'],
  changeBackgroundImageCommands: Object.values(BackgroundImage).map((el) => el.toLowerCase()),
};

const terminalSlice = createSlice({
  name: 'terminal',
  initialState: {
    terminalHistory,
    terminalInputHistory,
    availableAutocomplete,
    commands,
    autocompleteNumber: 0,
  },
  reducers: {
    addTerminalHistory(state, { payload }) {
      state.terminalHistory.push({
        message: payload,
        id: uuidv(),
      });
      if (payload.split(' ')[0] === 'root:~$') {
        state.terminalInputHistory.push(
          payload
            .split(' ')
            .splice(1, payload.length - 1)
            .join(' '),
        );
      }
    },
    clearTerminalHistory(state) {
      state.terminalHistory = [];
    },
    clearTerminalInputHistory(state) {
      state.terminalInputHistory = [];
    },
    resetAutocompleteNumber(state) {
      state.autocompleteNumber = 0;
    },
    incrementAutocompleteNumber(state) {
      state.autocompleteNumber++;
    },
    setAvailableAutocomplete(state, { payload }: { payload: string[] }) {
      state.availableAutocomplete = payload;
    },
  },
});

export default terminalSlice.reducer;
export const {
  addTerminalHistory,
  clearTerminalHistory,
  clearTerminalInputHistory,
  setAvailableAutocomplete,
  incrementAutocompleteNumber,
  resetAutocompleteNumber,
} = terminalSlice.actions;