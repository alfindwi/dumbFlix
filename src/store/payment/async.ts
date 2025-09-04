import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import api from "../../libs/api";

export const createPayment = createAsyncThunk(
  "payment/createPayment",
  async (planId: number, thunkAPI) => {
    try {
      const token = Cookies.get("token");
      const res = await api.post(
        `/api/payment/${planId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return res.data;
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Failed to create payment.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
