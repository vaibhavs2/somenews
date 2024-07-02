import React, { useState, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import Icon from "@expo/vector-icons/FontAwesome";
import { useSelector } from "react-redux";

import { getLoading } from "../store/selectors";

type Props = {
  isTopHeadLines: boolean;
  isRefreshing: boolean;
  setIsTopHeadLines: (value: boolean) => void;
};

export default function NewsType(props: Props) {
  /**
   * @var isTopHeadLines is to decide selection between 'Top-Headlines'
   * and 'Everything' and this is facility provided by NewsAPI
   */
  const { isTopHeadLines, setIsTopHeadLines } = props;
  const scrollViewRef = useRef<ScrollView>(null);
  const loading = useSelector(getLoading);

  const animateNewsType = (): void => {
    if (loading || props.isRefreshing) return;

    setIsTopHeadLines(!isTopHeadLines);
    if (isTopHeadLines) scrollViewRef.current?.scrollToEnd({ animated: true });
    else {
      scrollViewRef.current?.scrollTo({ x: 0, y: 0, animated: true });
    }
  };

  return (
    <View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        style={styles.scrollContainer}
        ref={scrollViewRef}
      >
        <TouchableWithoutFeedback onPress={animateNewsType}>
          <View>
            <Text style={styles.newsType}>Top-Headlines</Text>
            <Text style={styles.newsType}>Everything</Text>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
      <View style={styles.arrowIndicator}>
        <Icon name="angle-up" size={18} color="white" />
        <Icon name="angle-down" size={18} color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  newsType: {
    fontSize: 15,
    paddingVertical: 8,
    textAlign: "center",
    height: 38,
    color: "white",
    fontWeight: "bold",
  },
  scrollContainer: {
    backgroundColor: "red",
    height: 38,
  },
  arrowIndicator: {
    position: "absolute",
    end: 0,
    marginEnd: 10,
  },
});
