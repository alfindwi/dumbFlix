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
      seriesSlug,
      seasonNumber,
      episodeSlug,
    }: { seriesSlug: string; seasonNumber: number; episodeSlug: string },
    thunkAPI
  ) => {
    try {
      const res = await api.get(
        `/api/episode/${seriesSlug}/${seasonNumber}/${episodeSlug}`
      );
      return res.data;
    } catch (error: any) {
      console.error("Fetch failed:", error.response?.data || error.message);
      return thunkAPI.rejectWithValue("Failed to fetch episode.");
    }
  }
);

export const getEpisodeBySeason = createAsyncThunk(
  "episode/getEpisodeBySeason",
  async (
    { seriesName, seasonNumber }: { seriesName: string; seasonNumber: number },
    thunkAPI
  ) => {
    try {
      const res = await api.get(`/api/episode/${seriesName}/${seasonNumber}`);
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch episode.");
    }
  }
);

export const createEpisode = createAsyncThunk(
  "episode/createEpisode",
  async (
    { data, seriesName }: { data: FormData; seriesName: string },
    thunkAPI: any
  ) => {
    try {
      const res = await api.post(`/api/episode/${seriesName}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to create episode.");
    }
  }
);
