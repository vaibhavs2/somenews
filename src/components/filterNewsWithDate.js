/* @flow strict-local */

import React, {useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Animated,
  Easing,
  Button,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import type {Node} from 'react';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

type Props = {
  onSubmit: (success: boolean, startDate?: string, endDate?: string) => void,
  showDatePicker: boolean,
};

export default function FilterNewsWithDate(props: Props): Node {
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  const AnimatedIcon = Animated.createAnimatedComponent(Ionicons);
  const today = new Date().toISOString().slice(0, 10);
  const [getCurrentDate, setCurrentDate] = useState({start: today, end: today});

  const onReset = () => {
    rotateAnim.setValue(0);
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.Linear,
    }).start(() => {
      setCurrentDate({start: today, end: today});
    });
  };

  const submitDate = () => {
    if (getCurrentDate.start <= getCurrentDate.end)
      props.onSubmit(true, getCurrentDate.start, getCurrentDate.end);
    else alert("Start date can't be less than end date!");
  };
  /*
   * follow the issue
   * https://github.com/facebook/react-native/issues/32058
   * @Component AnimatedIcon
   */
  return (
    <Modal
      isVisible={props.showDatePicker}
      animationIn="slideInRight"
      animationOut="slideOutLeft"
      backdropOpacity={0.88}
      onRequestClose={() => {
        props.onSubmit(false);
      }}>
      <Pressable
        pressRetentionOffset={{bottom: 30, left: 30, right: 30, top: 30}}
        onPress={() => {
          props.onSubmit(false);
        }}
        style={{position: 'absolute', top: 0, end: 0}}>
        <Entypo name="cross" size={32} color="white" />
      </Pressable>

      <View style={styles.resetContainer}>
        <Text onPress={onReset} style={styles.resetText}>
          Reset
        </Text>
        <Text>to Today</Text>
        <AnimatedIcon
          style={{
            width: 24,
            height: 24,
            marginStart: 12,
            transform: [
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: (['0deg', '720deg']: Array<string>),
                }),
              },
            ],
          }}
          name="refresh-outline"
          size={24}
          color="white"
        />
      </View>
      <View style={styles.dateContainer}>
        <DatePicker
          style={{flex: 1}}
          date={getCurrentDate.start}
          mode="date"
          placeholder="select date from"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate={today}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          onDateChange={date => {
            setCurrentDate({...getCurrentDate, start: date});
          }}
          customStyles={{
            dateText: styles.dateText,
            dateInput: styles.dateInput,
          }}
        />
        <View style={styles.bar} />
        <DatePicker
          style={{flex: 1}}
          date={getCurrentDate.end}
          mode="date"
          placeholder="to"
          format="YYYY-MM-DD"
          minDate="2016-05-01"
          maxDate={today}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          showIcon={false}
          onDateChange={date => {
            setCurrentDate({...getCurrentDate, end: date});
          }}
          customStyles={{
            dateText: styles.dateText,
            dateInput: styles.dateInput,
          }}
        />
      </View>
      <Button title="Submit" color="black" onPress={submitDate} />
    </Modal>
  );
}

const styles = StyleSheet.create({
  resetContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  bar: {
    height: 2,
    width: 15,
    backgroundColor: 'white',
  },
  dateText: {
    color: 'white',
  },
  dateInput: {borderWidth: 0, borderBottomWidth: 2},
  resetText: {
    color: 'yellow',
    fontWeight: 'bold',
    marginEnd: 4,
  },
});
