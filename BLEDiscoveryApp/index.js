import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { BleManager } from 'react-native-ble-plx';

const DeviceManager = new BleManager();

const composeEnhancers = composeWithDevTools({
    // Specify here name, actionsBlacklist, actionsCreators and other options
});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk.withExtraArgument(DeviceManager))),
);

const appRedux = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

AppRegistry.registerComponent(appName, () => appRedux);