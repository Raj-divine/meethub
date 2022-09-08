import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export default modalSlice.reducer;
export const { closeModal, openModal } = modalSlice.actions;
