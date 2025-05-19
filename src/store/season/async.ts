import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../libs/api";

export const getSeason = createAsyncThunk(
  "season/getSeason",
  async (id: number, thunkAPI) => {
    try {
      const res = await api.get(`/api/season/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch season.");
    }
  }
);

export const createSeason = createAsyncThunk(
  "season/createSeason",
  async (payload: { seasonNumber: number }, thunkAPI) => {
    try {
      const res = await api.post("/api/season", payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to create season.");
    }
  }
);

export const updateSeason = createAsyncThunk(
  "season/updateSeason",
  async (data: FormData, thunkAPI) => {
    try {
      const res = await api.put(`/api/season/${data.get("id")}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to update season.");
    }
  }
);

export const deleteSeason = createAsyncThunk(
  "season/deleteSeason",
  async (id: number, thunkAPI) => {
    try {
      const res = await api.delete(`/api/season/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to delete season.");
    }
  }
);
