/* @flow strict-local */

import {createStore} from 'redux';
import type {Store} from 'redux';
import {indexReducer} from './reducers';
import type {Action, AppState, News} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistStore, persistReducer} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import type {PersistState, Persistor} from 'redux-persist/src/types';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['loading', 'isOnline'],
};

export const store: PersistState = createStore(
  persistReducer(persistConfig, indexReducer),
);
export const persistor: Persistor = persistStore(store);
