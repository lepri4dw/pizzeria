import {createAsyncThunk} from "@reduxjs/toolkit";
import {ApiDishesList, ApiOrder, ApiOrdersList, Order, OrderDish, OrderMutation} from "../types";
import axiosApi from "../axiosApi";

export const createOrder = createAsyncThunk<void, ApiOrder>(
  'orders/create',
  async (order) => {
    await axiosApi.post('/orders.json', order);
  }
);

export const fetchOrders = createAsyncThunk(
  'orders/fetchAll',
  async () => {
    const dishesResponse = await axiosApi.get<ApiDishesList | null>("/dishes.json");
    const dishes = dishesResponse.data;
    let lastOrders: Order[] = [];
    const response = await axiosApi.get<ApiOrdersList | null>('/orders.json');
    const orders = response.data;
    let newOrders: OrderMutation[] = [];
    if (orders) {
      newOrders = Object.keys(orders).map(id => {
        const order = orders[id];
        return {
          dishes: order.dishes,
          orderId: id,
          customer: order.customer,
        }
      })
    }

    if (dishes) {
      const newDishes = Object.keys(dishes);
      lastOrders = newOrders.map(order => {
        const lastDishes: OrderDish[] = [];
        Object.keys(order.dishes).forEach(id => {
          newDishes.forEach(dish => {
            if (dish === id) {
              lastDishes.push({
                name: dishes[id].name,
                price: dishes[id].price,
                amount: order.dishes[id],
                id
              })
            }
          })
        });
        return {
          dishes: lastDishes,
          orderId: order.orderId,
          customer: order.customer
        };
      })
    }

    return lastOrders;
  }
);

export const deleteOrder = createAsyncThunk<void, string>(
  'orders/delete',
  async (id) => {
    await axiosApi.delete('/orders/' + id + '.json')
  }
)
