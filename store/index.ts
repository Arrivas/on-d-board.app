import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import apartmentsReducer from "./apartmentsSlice";
import loadingReducer from "./loadingSlice";
import bookingReducer from "./bookingSlice";

const rootReducer = combineReducers({
  user: userReducer,
  apartments: apartmentsReducer,
  loading: loadingReducer,
  booking: bookingReducer,
});

export const store = configureStore({
  reducer: {
    user: userReducer,
    apartments: apartmentsReducer,
    loading: loadingReducer,
    booking: bookingReducer,
  },
});

export type RootState = ReturnType<typeof rootReducer>;
