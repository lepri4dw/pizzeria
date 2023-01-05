import {createSlice} from "@reduxjs/toolkit";
import {Order} from "../types";
import {RootState} from "../app/store";
import {createOrder, deleteOrder, fetchOrders} from "./ordersThunks";

interface OrdersState {
  fetchCreateLoading: boolean;
  orders: Order[];
  fetchOrdersLoading: boolean;
  deleteOrderLoading: false | string;
}

const initialState: OrdersState = {
  fetchCreateLoading: false,
  orders: [],
  fetchOrdersLoading: false,
  deleteOrderLoading: false,
}

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
    builder.addCase(fetchOrders.pending, state => {
      state.fetchOrdersLoading = true;
    });
    builder.addCase(fetchOrders.fulfilled, (state, {payload: orders}) => {
      state.fetchOrdersLoading = false;
      state.orders = orders;
    });
    builder.addCase(fetchOrders.rejected, state => {
      state.fetchOrdersLoading = false;
    });
    builder.addCase(deleteOrder.pending, (state, {meta: {arg: id}}) => {
      state.deleteOrderLoading = id;
    });
    builder.addCase(deleteOrder.fulfilled, state => {
      state.deleteOrderLoading = false;
    });
    builder.addCase(deleteOrder.rejected, state => {
      state.deleteOrderLoading = false;
    });
  }
});

export const ordersReducer = ordersSlice.reducer;
export const selectOrderCreateLoading = (state: RootState) => state.orders.fetchCreateLoading;
export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrdersLoading = (state: RootState) => state.orders.fetchOrdersLoading;
export const selectDeleteOrderLoading = (state: RootState) => state.orders.deleteOrderLoading;
