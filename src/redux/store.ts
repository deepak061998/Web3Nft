import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { combineReducers } from "redux";

import { nftSlice } from "./nft.slice";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const appReducer = combineReducers({
  nfts: nftSlice.reducer,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === "LOGOUT_USERS_PERSIST") {
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage: storage,
  whitelist: ["nfts"],
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const configureStorage = () => {
  const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: [thunk],
  });

  const persistor = persistStore(store);
  return { store, persistor };
};

export default configureStorage;
