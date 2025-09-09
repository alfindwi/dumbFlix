import { IAvatar } from "@/types/avatar";
import { createSlice } from "@reduxjs/toolkit";
import { createAvatar, getAvatar } from "./async";

export interface AvatarState {
  avatars: IAvatar[];
  loading: boolean;
  error: string | null;
}

const initialState: AvatarState = {
  avatars: [],
  loading: false,
  error: null,
};

const avatarSlice = createSlice({
  name: "avatar",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.avatars = Array.isArray(action.payload) ? action.payload : [];
      })
      .addCase(getAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.avatars.push(action.payload);
      })
      .addCase(createAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export default avatarSlice.reducer;