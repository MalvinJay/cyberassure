import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
// import { setupListeners } from '@reduxjs/toolkit/query'

// Reducers
import { userSlice } from "./features/userSlice";
import { profileSlice } from "./features/profileSlice";
import { krisSlice } from "./features/krisSlice";
import { departmentSlice } from "./features/departmentSlice";
import { organizationSlice } from "./features/organizationSlice";
import { generalSlice } from "./features/generalSlice";

// RTK services
// import { baseApi } from "./services/api/baseApi";
// import { userApi } from "./services/api/userData";

// Reducers
const rootReducer = combineReducers({
  [userSlice.name]        :   userSlice.reducer,
  [profileSlice.name]     :   profileSlice.reducer,
  [krisSlice.name]        :   krisSlice.reducer,
  [departmentSlice.name]  :   departmentSlice.reducer,
  [organizationSlice.name]:   organizationSlice.reducer,
  [generalSlice.name]:   generalSlice.reducer,
  // [userApi.reducerPath]   :   userApi.reducer
});

// config the store
const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
    // middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), userApi.middleware]
});

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    // we need it only on client side
    const persistConfig = {
      key: "orgposture",
      whitelist: ["user", "profile", "general", "departments"], // make sure it does not clash with server keys
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

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
// setupListeners(makeStore.dispatch)

export const wrapper = createWrapper(makeStore);