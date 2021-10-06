/* @flow strict-local */

import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import type {Node} from 'react';

type Props = {|
  text: string,
  domain: string,
  active: boolean,
  onPress: (domain: string) => void,
|};

export default function Chips(props: Props): Node {
  const [getSelected, setSelected] = useState(props.active);
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        setSelected(!getSelected);
        props.onPress(props.domain);
      }}>
      <Text
        style={[
          styles.container,
          {backgroundColor: getSelected ? 'green' : 'gray'},
        ]}>
        {props.text}
      </Text>
      <View style={styles.pinned}/>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 99,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontWeight: 'bold',
    marginVertical: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  pinned:{
   position:'absolute',
   end:'0',
   top:0,
   bottom:0,
   width:4,
   height:4,
   borderRadius:1,
   backgroundColor:'black' 
  }
});
