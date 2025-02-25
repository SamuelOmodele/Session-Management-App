import Sidebar from "./sidebarSlice";
import Modal from './modalSlice'
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        sidebar: Sidebar,
        modal: Modal
    }
})