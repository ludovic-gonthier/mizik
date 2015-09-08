import React from 'react';
import { Provider } from 'react-redux';
import { compose, createStore, applyMiddleware } from 'redux';

import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import Application from 'containers/Application';
import reducers from 'reducers/player';

let finalCreateStore = compose(
  devTools(),
  persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore)

let store = finalCreateStore(reducers);
let mount  = document.getElementById('mount-root');

module.hot.accept('reducers/player', () =>
  store.replaceReducer(require('reducers/player'))
);

React.render(
  <div>
    <Provider store={store}>
      {() => <Application />}
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  mount
);
