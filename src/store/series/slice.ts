import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISeries } from "../../types/series";
import { createSeries, getSeries, getSeriesByName } from "./async";

interface SeriesState {
  series: ISeries[];
  loading: boolean;
  error: string | null;
}

const initialState: SeriesState = {
  series: [],
  loading: false,
  error: null,
};

const seriesSlice = createSlice({
  name: "series",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSeries.fulfilled, (state, action) => {
        state.loading = false;
        state.series = action.payload;
      })
      .addCase(getSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(getSeriesByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSeriesByName.fulfilled, (state, action) => {
        state.loading = false;
        state.series = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      })
      .addCase(getSeriesByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    builder
      .addCase(createSeries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createSeries.fulfilled,
        (state, action: PayloadAction<ISeries>) => {
          state.loading = false;
          state.series.push(action.payload);
        }
      )
      .addCase(createSeries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default seriesSlice.reducer;
