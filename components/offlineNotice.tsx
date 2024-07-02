import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import { getAppOnline } from "../store/selectors";

type Props = {};

export default function OfflineNotice(props: Props) {
  const isAppOnline = useSelector(getAppOnline);

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
    backgroundColor: "gray",
    paddingHorizontal: 8,
    paddingVertical: 5,
    alignItems: "center",
  },
});
