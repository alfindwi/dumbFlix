import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../libs/api";
import { IUser } from "../../types/user";

export const loginAsync = createAsyncThunk<
  { token: string; user: IUser },
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (data, thunkAPI) => {
  try {
    const res = await api.post("/api/auth/login", data);
    const { token, user } = res.data;

    Cookies.set("token", token, { expires: 7 });
    Cookies.set("role", user.role, { expires: 7 });

    return { token, user };
  } catch (error: any) {
    console.error("Error:", error);
    const errorMessage =
      error.response?.data?.message || "Login failed. Please check your email and password.";
    return thunkAPI.rejectWithValue(errorMessage);
  }
});


export const registerAsync = createAsyncThunk<void, any>(
  "auth/register",
  async (data, thunkAPI) => {
    try {
      const res = await api.post("/api/auth/register", data);
      console.log(res.data);
      return res.data;
    } catch (error: any) {
      console.log(error);
      if (error instanceof Error) {
        return thunkAPI.rejectWithValue(error.message);
      }
    }
  }
);






