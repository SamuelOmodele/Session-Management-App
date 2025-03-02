// src/features/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    data: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchProfileStart(state) {
      console.log("Fetching profile started");
      state.loading = true;
      state.error = null;
    },
    fetchProfileSuccess(state, action) {
      state.data = action.payload;
      state.loading = false;
    },
    fetchProfileFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { fetchProfileStart, fetchProfileSuccess, fetchProfileFailure } =
  profileSlice.actions;
export default profileSlice.reducer;
