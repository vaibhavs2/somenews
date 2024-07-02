import { createStore } from "redux";
import { indexReducer } from "./reducers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  blacklist: ["loading", "isOnline"],
};

export const store = createStore(persistReducer(persistConfig, indexReducer));

export const persistor = persistStore(store);
