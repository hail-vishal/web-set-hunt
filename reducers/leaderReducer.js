import { createSlice } from "@reduxjs/toolkit";

export const leader = createSlice({
  name: "leader",
  initialState: [],
  reducers: {
    UPDATE_LEADER: (state, action) => {
      return action.payload;
    },
  },
});

export const { UPDATE_LEADER } = leader.actions;
export default leader.reducer;
