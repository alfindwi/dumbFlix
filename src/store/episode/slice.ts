import { createSlice } from "@reduxjs/toolkit";
import { IEpisode } from "../../types/episode";
import { getSeriesSeasonEpisode } from "./async";

interface EpisodeState {
  episode: IEpisode | null;
  loading: boolean;
  error: string | null;
}

const initialState: EpisodeState = {
  episode: null,
  loading: false,
  error: null,
};

const episodeSlice = createSlice({
  name: "episode",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSeriesSeasonEpisode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSeriesSeasonEpisode.fulfilled, (state, action) => {
        state.loading = false;
        state.episode = action.payload;  // satu episode
      })
      .addCase(getSeriesSeasonEpisode.rejected, (state, action) => {
        state.loading = false;
        state.error = typeof action.payload === "string"
          ? action.payload
          : action.error.message ?? "Error fetching episode";
      });
  },
});


export default episodeSlice.reducer;