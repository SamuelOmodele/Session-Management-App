import Sidebar from "./sidebarSlice";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        sidebar: Sidebar
    }
})