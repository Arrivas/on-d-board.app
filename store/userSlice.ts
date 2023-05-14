import { createSlice } from "@reduxjs/toolkit";
import { UserSliceInitialState } from "../App";

const initialState: UserSliceInitialState = {
  user: {
    docId: "",
    email: "",
    firstName: "",
    imageUrl: "",
    lastName: "",
    password: "",
    phoneNumber: "",
    uid: "",
    userType: "",
    apartmentIds: [],
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
