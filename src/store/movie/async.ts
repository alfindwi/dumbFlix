import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../libs/api";
import Cookies from "js-cookie";

export const getMovies = createAsyncThunk(
  "movie/getMovies",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/movie");
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch movies.");
    }
  }
);

export const getMovieByName = createAsyncThunk(
  "movie/getMovieByName",
  async (title: string, thunkAPI) => {
    try {
      const res = await api.get(`/api/movie/${title}`);
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch movies.");
    }
  }
);

export const getMovieBySlug = createAsyncThunk(
  "movie/getMovieBySlug",
  async (slug: string, thunkAPI) => {
    try {
      const res = await api.get(`/api/movie/slug/${slug}`);
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch movie by slug.");
    }
  }
);

export const createMovie = createAsyncThunk(
  "movie/createMovie",
  async (data: FormData, thunkAPI) => {
    try {
      const res = await api.post("/api/movie", data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to create movie.");
    }
  }
);
