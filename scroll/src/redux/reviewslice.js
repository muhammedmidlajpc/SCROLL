import { createSlice } from "@reduxjs/toolkit";

const reviewslice = createSlice({
  name: "review",
  initialState: [],
  reducers: {
    addreview: (state, action) => {
      state.push({cmnt:action.payload});
    }
  }
});
export const { addreview } = reviewslice.actions;
export default reviewslice.reducer;
