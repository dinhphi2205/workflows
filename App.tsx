/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {AppStack} from './src/navigation';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {ActivityIndicator} from 'react-native';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size={'small'} />}
        persistor={persistor}>
        <AppStack />
      </PersistGate>
    </Provider>
  );
}

export default App;
