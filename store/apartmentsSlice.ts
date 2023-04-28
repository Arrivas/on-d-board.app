import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Apartments } from "../App";

interface ApartmentsState {
  apartments: Apartments[];
}

const initialState: ApartmentsState = {
  apartments: [],
};

const apartmentsSlice = createSlice({
  name: "apartments",
  initialState,
  reducers: {
    setApartments: (state, action: PayloadAction<Apartments[]>) => {
      state.apartments = action.payload;
    },
  },
});

export const { setApartments } = apartmentsSlice.actions;
export default apartmentsSlice.reducer;
