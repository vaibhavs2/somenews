import { Stack } from "expo-router";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "@/store/store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Stack>
          <Stack.Screen
            name="index"
            options={{
              headerTitle: "somenews",
              statusBarColor: "white",
              statusBarStyle: "dark",
            }}
          />
          <Stack.Screen
            name="NewsDetail"
            options={{
              headerShown: false,
              statusBarColor: "white",
              statusBarStyle: "dark",
            }}
          />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
