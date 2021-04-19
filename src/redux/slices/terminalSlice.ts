import { createSlice } from '@reduxjs/toolkit';

const terminalHistory: string[] = [];

type CoordsType = {
  payload: {
    top: string;
    left: string;
  };
};

const terminalSlice = createSlice({
  name: 'terminal',
  initialState: {
    isTerminalOpen: localStorage.getItem('isTerminalOpen') === 'true' || false,
    isTerminalCollapsed: localStorage.getItem('isTerminalCollapsed') === 'true' || false,
    terminalIconTopCoord: localStorage.getItem('terminalIconTopCoord') || '3rem',
    terminalIconLeftCoord: localStorage.getItem('terminalIconLeftCoord') || '1rem',
    terminalTopCoord: localStorage.getItem('terminalTopCoord') || '5rem',
    terminalLeftCoord: localStorage.getItem('terminalLeftCoord') || '5rem',
    terminalHistory,
  },
  reducers: {
    openTerminal(state) {
      // eslint-disable-next-line no-param-reassign
      state.isTerminalOpen = true;
      localStorage.setItem('isTerminalOpen', 'true');
    },
    closeTerminal(state) {
      // eslint-disable-next-line no-param-reassign
      state.isTerminalOpen = false;
      localStorage.setItem('isTerminalOpen', 'false');
    },
    toggleCollapseTerminal(state) {
      // eslint-disable-next-line no-param-reassign
      state.isTerminalCollapsed = !state.isTerminalCollapsed;
      localStorage.setItem('isSettingsCollapsed', state.isTerminalCollapsed.toString());
    },
    addTerminalHistory(state, action) {
      state.terminalHistory.push(action.payload);
    },
    clearTerminalHistory(state) {
      // eslint-disable-next-line no-param-reassign
      state.terminalHistory = [];
    },
    changeTerminalCoord(state, { payload }: CoordsType) {
      // eslint-disable-next-line no-param-reassign
      state.terminalTopCoord = payload.top;
      // eslint-disable-next-line no-param-reassign
      state.terminalLeftCoord = payload.left;
    },
    changeTerminalIconCoord(state, { payload }: CoordsType) {
      // eslint-disable-next-line no-param-reassign
      state.terminalIconTopCoord = payload.top;
      // eslint-disable-next-line no-param-reassign
      state.terminalIconLeftCoord = payload.left;
    },
  },
});

export default terminalSlice.reducer;
export const {
  openTerminal,
  closeTerminal,
  toggleCollapseTerminal,
  addTerminalHistory,
  clearTerminalHistory,
  changeTerminalCoord,
  changeTerminalIconCoord,
} = terminalSlice.actions;
