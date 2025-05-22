import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import isEqual from "lodash.isequal";
import { IEpisode } from "../../types/episode";
import {
  createEpisode,
  getEpisodeBySeason,
  getSeriesSeasonEpisode,
} from "./async";

interface EpisodeState {
  episode: IEpisode | null;
  episodes: IEpisode[];
  loading: boolean;
  error: string | null;
  currentSeriesName?: string;
  currentSeasonNumber?: number;
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
        state.episode = action.payload;
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
        state.episodes = [];
      })
      .addCase(getEpisodeBySeason.fulfilled, (state, action) => {
        state.loading = false;
        if (!isEqual(state.episodes, action.payload)) {
          state.episodes = action.payload;
          state.currentSeriesName = action.meta.arg.seriesName;
          state.currentSeasonNumber = action.meta.arg.seasonNumber;
        }
      })
      .addCase(getEpisodeBySeason.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message ?? "Error fetching episode";
      });

    builder
      .addCase(createEpisode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createEpisode.fulfilled,
        (state, action: PayloadAction<IEpisode>) => {
          state.loading = false;
          state.episodes.push(action.payload);
        }
      )
      .addCase(createEpisode.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message ?? "Error creating episode";
      });
  },
});

export default episodeSlice.reducer;
