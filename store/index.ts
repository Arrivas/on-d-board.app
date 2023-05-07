import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import apartmentsReducer from "./apartmentsSlice";
import loadingReducer from "./loadingSlice";

const rootReducer = combineReducers({
  user: userReducer,
  apartments: apartmentsReducer,
  loading: loadingReducer,
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    apartments: apartmentsReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof rootReducer>;
