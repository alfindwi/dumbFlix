import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../libs/api";
import { IPlan } from "../../types/plan";
import Cookies from "js-cookie";

export const getPlans = createAsyncThunk(
  "plan/getPlans",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/api/plan");
      return res.data;
    } catch (error) {
      console.error("Error:", error);
      return thunkAPI.rejectWithValue("Failed to fetch plans.");
    }
  }
);

export const createPlan = createAsyncThunk(
  "plan/createPlan",
  async (data: IPlan, thunkAPI) => {
    try {
      const res = await api.post("/api/plan", data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to create plan.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePlan = createAsyncThunk(
  "plan/updatePlan",
  async (data: IPlan, thunkAPI) => {
    try {
      const res = await api.put(`/api/plan/${data.planId}`, data, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },
      });
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to update plan.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletePlan = createAsyncThunk(
  "plan/deletePlan",
  async (planId: number, thunkAPI) => {
    try {
      const res = await api.delete(`/api/plan/${planId}`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      return res.data;
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to delete plan.";
      return thunkAPI.rejectWithValue(message);
    }
  }
);
