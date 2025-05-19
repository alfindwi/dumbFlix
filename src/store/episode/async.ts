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
