import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../../types/category";
import { createCategory, getCategories } from "./async";

interface categoryState {
  category: ICategory[];
  loading: boolean;
  error: string | null;
}

const initialState: categoryState = {
  category: [],
  loading: false,
  error: null,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get categories
    builder
      .addCase(getCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.category = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // create category
    builder
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createCategory.fulfilled,
        (state, action: PayloadAction<ICategory>) => {
          state.loading = false;
          state.category.push(action.payload);
        }
      )
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;