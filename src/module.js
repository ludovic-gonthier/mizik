import React from 'react';
import { Provider } from 'react-redux';
import { compose, createStore } from 'redux';

import { devTools, persistState } from 'redux-devtools';
import { DevTools, LogMonitor, DebugPanel } from 'redux-devtools/lib/react';

import Application from 'containers/Application';
import reducers from 'reducers/player';

const finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

const store = finalCreateStore(reducers);
const mount  = document.getElementById('mount-root');

module.hot && module.hot.accept('reducers/player', () =>
  store.replaceReducer(require('reducers/player'))
);

React.render(
  <div id="react-provider-wrapper">
    <Provider store={store}>
      {() => <Application />}
    </Provider>
  </div>,
  mount
);

    // <DebugPanel top right bottom>
    //   <DevTools store={store} monitor={LogMonitor} />
    // </DebugPanel>
