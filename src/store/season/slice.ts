import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISeason } from "../../types/season";
import { createSeason, getSeasonByName } from "./async";

interface SeasonState {
  seasons: ISeason[];
  loading: boolean;
  error: string | null;
}

const initialState: SeasonState = {
  seasons: [],
  loading: false,
  error: null,
};

const seasonSlice = createSlice({
  name: "season",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSeasonByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSeasonByName.fulfilled, (state, action) => {
        state.loading = false;
        state.seasons = action.payload;
      })
      .addCase(getSeasonByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createSeason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSeason.fulfilled, (state, action: PayloadAction<ISeason>) => {
        state.loading = false;
        state.seasons.push(action.payload);
      })
      .addCase(createSeason.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default seasonSlice.reducer;