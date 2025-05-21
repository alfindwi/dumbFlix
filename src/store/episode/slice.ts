import { createSlice } from "@reduxjs/toolkit";
import isEqual from 'lodash.isequal';
import { IEpisode } from "../../types/episode";
import { getEpisodeBySeason, getSeriesSeasonEpisode } from "./async";

interface EpisodeState {
  episode: IEpisode | null;
  episodes: IEpisode[];
  loading: boolean;
  error: string | null;
}

const initialState: EpisodeState = {
  episode: null,
  loading: false,
  episodes: [],
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
        state.episode = action.payload; // satu episode
      })
      .addCase(getSeriesSeasonEpisode.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message ?? "Error fetching episode";
      });

    builder
      .addCase(getEpisodeBySeason.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEpisodeBySeason.fulfilled, (state, action) => {
        state.loading = false;
        if (!isEqual(state.episodes, action.payload)) {
          state.episodes = action.payload;
        }
      })
      .addCase(getEpisodeBySeason.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message ?? "Error fetching episode";
      });
  },
});

export default episodeSlice.reducer;
