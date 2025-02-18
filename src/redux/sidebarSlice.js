import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    activeMenu: ''
};

const sidebarSlice = createSlice({
    name: 'sidebar', 
    initialState, 
    reducers: {
        setActiveMenu: (state, action) => {
            state.activeMenu = action.payload;
        }
    }
});

export const {setActiveMenu} = sidebarSlice.actions;
export default sidebarSlice.reducer