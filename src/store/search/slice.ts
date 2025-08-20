import { ISearch } from "@/types/search";
import { searchAll } from "./async";
import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  search: ISearch[];
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  search: [],
  loading: false,
  error: null,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchAll.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchAll.fulfilled, (state, action) => {
        state.loading = false;
        state.search = action.payload;
      })
      .addCase(searchAll.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default searchSlice.reducer;