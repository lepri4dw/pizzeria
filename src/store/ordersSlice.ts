import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import { ApiOrder } from "../types";
import axiosApi from "../axiosApi";
import {RootState} from "../app/store";

interface OrdersState {
  fetchCreateLoading: boolean;
}

const initialState: OrdersState = {
  fetchCreateLoading: false,
}

export const createOrder = createAsyncThunk<void, ApiOrder>(
  'orders/create',
  async (order) => {
    await axiosApi.post('/orders.json', order);
  }
)

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, state => {
      state.fetchCreateLoading = true;
    });
    builder.addCase(createOrder.fulfilled, state => {
      state.fetchCreateLoading = false;
    });
    builder.addCase(createOrder.rejected, state => {
      state.fetchCreateLoading = false;
    });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const selectOrderCreateLoading = (state: RootState) => state.orders.fetchCreateLoading;
