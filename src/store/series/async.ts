import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../libs/api";

export const getSeries = createAsyncThunk(
  "series/getSeries",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/series");
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch series.");
    }
  }
);

export const getSeriesByName = createAsyncThunk(
  "series/getSeriesByName",
  async (seriesName: string, thunkAPI) => {
    try {
      const res = await api.get(`/api/series/${seriesName}`);
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch series.");
    }
  }
);

export const createSeries = createAsyncThunk(
  "series/createSeries",
  async (data: FormData, thunkAPI) => {
    try {
      const res = await api.post("/api/series", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to create series.");
    }
  }
);

export const updateSeries = createAsyncThunk(
  "series/updateSeries",
  async (data: FormData, thunkAPI) => {
    try {
      const res = await api.put(`/api/series/${data.get("id")}`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to update series.");
    }
  }
);

export const deleteSeries = createAsyncThunk(
  "series/deleteSeries",
  async (id: number, thunkAPI) => {
    try {
      const res = await api.delete(`/api/series/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to delete series.");
    }
  }
);
