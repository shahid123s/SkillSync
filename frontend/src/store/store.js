import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import adminReducer from "./adminSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session"; // uses session storage for web

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "admin"],
};

const rootReducer = combineReducers({
  user: userReducer,
  admin: adminReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
export default store;
