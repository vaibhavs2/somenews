/* @flow strict-local */

import React from 'react';
import type {Node} from 'react';
import {View, StatusBar} from 'react-native';
import {WebView} from 'react-native-webview';

import {UI_DARK_STATUS_BAR} from '../UIConstants';
import {OfflineNotice} from '../components';

type Route = {
  key: string,
  name: 'Detail',
  params: {url: string},
};

export default function NewsDetail({route}: {route: Route}): Node {
  return (
    <>
      <StatusBar backgroundColor={UI_DARK_STATUS_BAR} />
      <OfflineNotice />
      <WebView source={{uri: route.params.url}} />
    </>
  );
}
