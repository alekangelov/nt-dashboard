import * as React from 'react';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import Background from './Components/Background';
import Sidebar from './Components/Sidebar';
import ModalProvider from './lib/global/ModalContext';
import {
  changeBookmarks,
  changeWeather,
} from './lib/global/redux/actions/rootActions';
import { useRootSelector } from './lib/global/redux/reducers';
import settingsStore from './lib/global/redux/settingsStore';
import useAction from './lib/hooks/useAction';
import useWeather from './lib/hooks/useWeather';
import Routes from './routes';

const { store, persistor } = settingsStore();

const AppSetup: React.FC<any> = () => {
  const addBookmarks = useAction(changeBookmarks);
  const addWeather = useAction(changeWeather);
  const { city, degreeFormat, country, theme } = useRootSelector(
    ({ settings }) => ({
      city: settings.city,
      country: settings.country,
      degreeFormat: settings.degreeFormat,
      theme: settings.theme,
    }),
  );
  const state = useWeather({
    location: `${city},${country}`,
    u: degreeFormat,
    format: 'json',
  });

  React.useEffect(() => {
    if (!state.loading && state.result && state.result?.forecasts?.length) {
      addWeather(state.result);
    }
    // eslint-disable-next-line
  }, [state.loading]);
  React.useEffect(() => {
    try {
      if (window.chrome.bookmarks) {
        window.chrome.bookmarks.getTree((e) => addBookmarks(e));
      }
    } catch (e) {
      console.error(e);
    }
    // eslint-disable-next-line
  }, []);
  React.useEffect(() => {
    document.body.classList.remove('theme-dark', 'theme-light');
    document.body.classList.add(`theme-${theme}`);
  }, [theme]);

  return null;
};

(AppSetup as any).whyDidYouRender = true;

const Copyright = () => (
  <div className="copyright">
    <p>Copyright 2021 © Alek Angelov</p>
  </div>
);

const SubApp = () => {
  return (
    <>
      <AppSetup />
      <HashRouter>
        <div className="App">
          <Background />
          <div className="sidebar">
            <Sidebar />
          </div>
          <div className="App_inner">
            <div className="App_router">
              <Routes />
            </div>
          </div>
        </div>
        <Copyright />
      </HashRouter>
    </>
  );
};

function App(): React.ReactElement {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ModalProvider>
          <SubApp />
        </ModalProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
