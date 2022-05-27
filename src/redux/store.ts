import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import authReducer from "./reducers/authSlice";
import messageReducer from "./reducers/messageSlice";

const persistConfig = {
  storage: storage,
  stateReconciler: autoMergeLevel2,
};
const authPersistConfig = {
  ...persistConfig,
  key: "user",
  whitelist: ["auth"],
  blacklist: ["message"],
};

export const rootReducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
});

export const persistedReducer = persistReducer<any, any>(
  authPersistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: true,
  middleware: [thunk],
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
