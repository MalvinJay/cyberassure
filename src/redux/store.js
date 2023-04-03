import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

// Reducers
import { userSlice } from "./features/userSlice";
import { profileSlice } from "./features/profileSlice";
import { krisSlice } from "./features/krisSlice";

// Reducers
const rootReducer = combineReducers({
  [userSlice.name]:    userSlice.reducer,
  [profileSlice.name]: profileSlice.reducer,
  [krisSlice.name]:    krisSlice.reducer
});

// config the store
const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    // we need it only on client side
    const persistConfig = {
      key: "orgposture",
      whitelist: ["user", "profile"], // make sure it does not clash with server keys
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);

    let store = configureStore({
      reducer: persistedReducer,
      devTools: process.env.NODE_ENV !== "production"
    });

    store.__persistor = persistStore(store); // Nasty hack
    return store;
  }
};

export const wrapper = createWrapper(makeStore);