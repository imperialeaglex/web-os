import store from 'redux/store';
import { Apps } from 'types/apps';
import { addWindow, deleteWindow, setWindowActive } from './appsSlice';

describe('app slice', () => {
  afterEach(() => {
    store.dispatch(deleteWindow(Apps.Settings));
    store.dispatch(deleteWindow(Apps.Calculator));
    store.dispatch(deleteWindow(Apps.Terminal));
  });

  it('has correct order when calls setWindowActive', () => {
    store.dispatch(addWindow(Apps.Terminal));
    store.dispatch(addWindow(Apps.Settings));
    store.dispatch(addWindow(Apps.Calculator));
    store.dispatch(setWindowActive(Apps.Calculator));
    expect(store.getState().apps.apps[0]).toEqual(Apps.Calculator);
  });

  it('has correct list when delete one app', () => {
    store.dispatch(addWindow(Apps.Terminal));
    store.dispatch(addWindow(Apps.Settings));
    store.dispatch(addWindow(Apps.Calculator));
    store.dispatch(deleteWindow(Apps.Settings));
    expect(store.getState().apps.apps).toEqual([Apps.Calculator, Apps.Terminal]);
  });

  it('has correct order when adds app', () => {
    store.dispatch(addWindow(Apps.Terminal));
    store.dispatch(addWindow(Apps.Settings));
    store.dispatch(addWindow(Apps.Calculator));
    expect(store.getState().apps.apps).toEqual([Apps.Calculator, Apps.Settings, Apps.Terminal]);
  });
});

export {};
