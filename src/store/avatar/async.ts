import api from "../../libs/api";
import { IAvatar } from "../../types/avatar";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAvatar = createAsyncThunk(
  "avatar/getAvatar",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/avatar");
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch avatar.");
    }
  }
);

// wajib role admin
export const createAvatar = createAsyncThunk(
  "avatar/createAvatar",
  async (data: IAvatar, thunkAPI) => {
    try {
      const res = await api.post("/api/avatar", data);
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to create avatar.");
    }
  }
);