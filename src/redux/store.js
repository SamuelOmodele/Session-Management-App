import Sidebar from "./sidebarSlice";
import Modal from "./modalSlice";
import Profile from "./profileSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    sidebar: Sidebar,
    modal: Modal,
    profile: Profile,
  },
});
