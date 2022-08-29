import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    toggleNavbar(state) {
      state.isOpen = !state.isOpen;
    },
  },
});

export default navbarSlice.reducer;
export const { toggleNavbar } = navbarSlice.actions;
