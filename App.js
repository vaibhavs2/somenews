/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import {Button} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import SomeNews from './src/screens/someNews';
import NewsDetail from './src/screens/newsDetail';
import {UI_COLOR_DARK} from './src/UIConstants.js';
import {store, persistor} from './src/store';

const Stack = createNativeStackNavigator();
const MyTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: UI_COLOR_DARK,
    card: UI_COLOR_DARK,
  },
};

const App: () => Node = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer theme={MyTheme}>
          <Stack.Navigator
            initialRouteName="Index"
            screenOptions={{headerTitleAlign: 'center'}}>
            <Stack.Screen
              name="Index"
              component={SomeNews}
              options={{
                title: 'Some News',
              }}
            />
            <Stack.Screen name="Detail" component={NewsDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;
