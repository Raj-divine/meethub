import { configureStore } from "@reduxjs/toolkit";
import modalSlick from "./modalSlice";
import navbarSlice from "./navbarSlice";

const store = configureStore({
  reducer: {
    navbar: navbarSlice,
    modal: modalSlick,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
