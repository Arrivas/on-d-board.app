import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import apartmentsReducer from "./apartmentsSlice";

const rootReducer = combineReducers({
  user: userReducer,
  apartments: apartmentsReducer,
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    apartments: apartmentsReducer,
  },
});

export type RootState = ReturnType<typeof rootReducer>;
