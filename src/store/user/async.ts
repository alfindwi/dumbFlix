import api from "../../libs/api";
import { IUser } from "../../types/user";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";


export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, thunkAPI) => {
    try {
      const token = Cookies.get("token");
      const res = await api.get("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to get current user.");
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (data: IUser, thunkAPI) => {
    try {
      const token = Cookies.get("token");
      const res = await api.put(`/api/users/me`, data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to update user.");
    }
  }
);
