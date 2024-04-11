import { createSlice } from "@reduxjs/toolkit";
import { fetchDay } from "./dayAPI";

const daySlice = createSlice({
  name: "day",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDay.fulfilled, (_state, { payload }) => {
      return payload;
    });
  },
});

// export const {} = daySlice.actions;

export const dayReducer = daySlice.reducer;

export const daySelect = (state: { day: any }) => state.day;
