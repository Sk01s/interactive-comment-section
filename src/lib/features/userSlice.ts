import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./../store";

// Define a type for the slice state
export interface User {
  username: string;
  image: {
    png: string;
    webp: string;
  };
}
export interface UserState {
  data: User;
}

// Define the initial state using that type
const initialState: UserState = {
  data: {
    username: "",
    image: {
      png: "",
      webp: "",
    },
  },
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loadUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
  },
});

export const { loadUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUser = (state: RootState) => state.user.data;

export default userSlice.reducer;
