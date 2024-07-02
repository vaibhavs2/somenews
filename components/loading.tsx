import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";

import { getLoading } from "../store/selectors";

export default function Loading() {
  const loading = useSelector(getLoading);
  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.container}>
          <Text style={styles.text}>Loading ...</Text>
          <ActivityIndicator size="small" color="gray" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 30,
  },
  text: {
    marginEnd: 5,
  },
});
