import { configureStore, combineReducers } from "@reduxjs/toolkit";
import loaderReducer from "./loaderReducer";
import lobbyReducer from "./lobbyReducer";
import teamReducer from "./teamReducer";
import userReducer from "./userReducer";
import { persistReducer, persistStore } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import questionReducer from "./questionReducer";
import leaderReducer from "./leaderReducer";

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

export default storage;

export const configuredStore = (passedStorage) => {
  const combinedReducers = combineReducers({
    team: teamReducer,
    loader: loaderReducer,
    user: userReducer,
    lobby: lobbyReducer,
    questions: questionReducer,
    leader: leaderReducer,
  });

  const rootReducer = (state, action) => {
    if (action.type === "SIGN_OUT") {
      storage?.removeItem("persist:root");
      return combinedReducers(undefined, action);
    }
    return combinedReducers(state, action);
  };

  if (!passedStorage) {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
    });
    return { store };
  }

  const persistConfig = {
    key: "root",
    storage: passedStorage,
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

  const persistor = persistStore(store);
  return { store, persistor };
};
