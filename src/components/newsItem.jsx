/* @flow strict-local */

import React from 'react';
import type {Node} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import type {News} from '../types';

type Props = {|
  onPress: () => void,
  onLongPress?: () => void,
  news: News,
|};
const Time_Unit_Mapping = {
  days: 24 * 60 * 60 * 1000,
  hours: 60 * 60 * 1000,
  minutes: 60 * 1000,
  seconds: 1000,
};
const getHumanizedDiff = diff => {
  let days = Math.floor(diff / Time_Unit_Mapping.days);
  let hours = Math.floor(
    (diff % Time_Unit_Mapping.days) / Time_Unit_Mapping.hours,
  );
  let minutes = Math.floor(
    (diff % Time_Unit_Mapping.hours) / Time_Unit_Mapping.minutes,
  );
  if (days) {
    return days + (hours < 2 ? ' day' : ' days');
  } else if (hours) {
    return hours + (hours < 2 ? ' hour' : ' hours');
  } else {
    return minutes + (hours < 2 ? ' min' : ' mins');
  }
};

export default function NewsItems(props: Props): Node {
  const {news, onPress, onLongPress} = props;
  const humanisedTime = getHumanizedDiff(
    new Date() - new Date(news.publishedAt),
  );
  //API sometime gives the whole long string for Author instead of simply providing names
  const index =
    news.author?.indexOf(',') === -1 ? undefined : news.author?.indexOf(',');
  const author = news.author?.substr(0, index);

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.7}
      onLongPress={onLongPress}
      onPress={onPress}>
      <View style={styles.textContent}>
        <Text style={styles.title} numberOfLines={5}>
          {news.title}
        </Text>
        <Text style={styles.by}>
          by: {author || 'Unknown'}
          <Text style={styles.time}> • {humanisedTime}</Text>
        </Text>
        <Text style={styles.by}>source: {news.source.name}</Text>
      </View>
      <Image source={{uri: news.urlToImage}} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 6,
    paddingHorizontal: 5,
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontSize: 15,
  },
  by: {
    fontSize: 12,
    color: '#b5b5b5',
  },
  time: {
    color: '#8f8d8d',
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 8,
    paddingHorizontal: 2,
  },
});
