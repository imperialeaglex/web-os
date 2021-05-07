import store from 'redux/store';
import { Locales } from 'types/locales';
import { terminalProcessChangeLocale } from '.';

describe('change locale terminal module', () => {
  store.dispatch = jest.fn();

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('dispatch change locale then input = ru', () => {
    terminalProcessChangeLocale('ru');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Locale was change',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: Locales.Russian,
      type: 'locale/setLocale',
    });
  });

  it('dispatch change locale then input = br', () => {
    terminalProcessChangeLocale('br');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Locale was change',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: Locales.Britain,
      type: 'locale/setLocale',
    });
  });

  it('dispatch help string then input = help', () => {
    terminalProcessChangeLocale('help');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> This command changes locale',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available locales: ru, br',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('dispatch help string then input = -h', () => {
    terminalProcessChangeLocale('-h');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> This command changes locale',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available locales: ru, br',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('dispatch syntax string then input empty', () => {
    terminalProcessChangeLocale('');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Unknown syntax, please try again',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Syntax: change "category to change" "new value"',
      type: 'terminal/addTerminalHistory',
    });
  });

  it('dispatch unknown string then input uncorrect', () => {
    terminalProcessChangeLocale('dasdasdas');
    expect(store.dispatch).toBeCalledTimes(2);
    expect(store.dispatch).toHaveBeenNthCalledWith(1, {
      payload: '> Unknown locale',
      type: 'terminal/addTerminalHistory',
    });
    expect(store.dispatch).toHaveBeenNthCalledWith(2, {
      payload: '> Available locales: ru, br',
      type: 'terminal/addTerminalHistory',
    });
  });
});

export {};