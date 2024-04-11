import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AsteroidDetails, fetchNearby } from "./nearbyAPI";

const nearbySlice = createSlice({
  name: "nearby",
  initialState: [] as AsteroidDetails[],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      fetchNearby.fulfilled,
      (_state, action: PayloadAction<AsteroidDetails[]>) => {
        return action.payload;
      }
    );
  },
});

export const nearbyReducer = nearbySlice.reducer;

export const nearbySelect = (state: { nearby: AsteroidDetails[] }) =>
  state.nearby;
