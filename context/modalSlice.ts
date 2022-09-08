import { createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";

const initialState = {
  isOpen: false,
  loggingIn: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal(state) {
      state.isOpen = false;
    },
    openModal(state, action) {
      state.isOpen = true;
      state.loggingIn = action.payload.loggingIn;
    },
    toggleLogIn(state) {
      state.loggingIn = !state.loggingIn;
    },
  },
});

export default modalSlice.reducer;
export const { closeModal, openModal, toggleLogIn } = modalSlice.actions;
