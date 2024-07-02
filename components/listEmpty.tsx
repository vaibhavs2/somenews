import React from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";

export default function ListEmpty() {
  return (
    <View style={styles.contanier}>
      <View style={styles.content}>
        <Text>Hurray! No news ... </Text>
        <ActivityIndicator size="small" color="white" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    justifyContent: "center",
  },
  content: { flexDirection: "row", justifyContent: "center" },
});
