import React from "react";
import { WebView } from "react-native-webview";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import { OfflineNotice } from "../components";

type RouteProps = { url: string };

export default function NewsDetail() {
  const params = useLocalSearchParams<RouteProps>();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <OfflineNotice />
      <WebView startInLoadingState source={{ uri: params.url! }} />
    </SafeAreaView>
  );
}
