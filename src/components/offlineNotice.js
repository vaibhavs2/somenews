/* @flow strict-local */

import React, {useRef} from 'react';
import type {Node} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

import {getAppOnline} from '../selectors';

type Props = {};

export default function OfflineNotice(props: Props): Node {
  const isAppOnline = useSelector(state => state.isOnline);

  if (isAppOnline) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>You don't have Internet connection</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignItems: 'center',
  },
});
