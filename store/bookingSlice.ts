import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookingSliceState } from "../App";

const initialState: BookingSliceState = {
  bookings: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action: PayloadAction<any>) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action: PayloadAction<any>) => {
      state.bookings.push(action.payload);
    },
    removeBooking: (state, action: PayloadAction<string>) => {
      state.bookings = state.bookings.filter(
        (booking) => booking.apartmentRoomsId !== action.payload
      );
    },
  },
});

export const { addBooking, removeBooking, setBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
