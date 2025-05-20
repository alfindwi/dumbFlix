import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../libs/api";

export const getEpisodeByName = createAsyncThunk(
  "episode/getEpisode",
  async (seriesName: string, thunkAPI) => {
    try {
      const res = await api.get(`/api/episode/${seriesName}`);
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch episode.");
    }
  }
);

export const getSeriesSeasonEpisode = createAsyncThunk(
  "episode/getSeriesSeasonEpisode",
  async (
    {
      seriesName,
      seasonNumber,
      episodeName,
    }: { seriesName: string; seasonNumber: number; episodeName: string },
    thunkAPI
  ) => {
    try {
      const res = await api.get(
        `/api/episode/${seriesName}/season-${seasonNumber}/episode-${episodeName}`
      );
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch episode.");
    }
  }
);
