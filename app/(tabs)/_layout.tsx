import React from 'react';
import { Provider } from 'react-redux';
import AppNavigator from '../navigation/AppNavigation';
import { store } from '../../context/store';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export default function Layout() {

  const perStore = persistStore(store);

  return (

    <Provider store={store}>
      <PersistGate loading={null} persistor={perStore}>
        <AppNavigator />
      </PersistGate>
    </Provider>

  );
}
