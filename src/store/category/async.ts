import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../libs/api";
import Cookies from "js-cookie";

export const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/category");
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch categories.");
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (data: { categoryName: string }, thunkAPI) => {
    try {
      const res = await api.post("/api/category", data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error) {
        console.error("Error:", error);
        return thunkAPI.rejectWithValue("Failed to create category.");
    }
  }
);
