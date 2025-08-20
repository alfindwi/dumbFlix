import api from "../../libs/api";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchAll = createAsyncThunk(
  "search/searchAll",
  async (keyword: string, thunkAPI) => {
    try {
      const res = await api.get(`/api/search/${keyword}`);
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch search.");
    }
  }
);
