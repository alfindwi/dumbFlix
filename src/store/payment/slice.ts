import { IPayment } from "@/types/payment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createPayment } from "./async";

interface PaymentState {
  loading: boolean;
  error: string | null;
  payment: IPayment[] | null;
}

const initialState: PaymentState = {
  loading: false,
  error: null,
  payment: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    resetPayment(state) {
      state.loading = false;
      state.error = null;
      state.payment = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        createPayment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.payment = action.payload;
        }
      )
      .addCase(createPayment.rejected, (state, action: any) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
export const { resetPayment } = paymentSlice.actions;