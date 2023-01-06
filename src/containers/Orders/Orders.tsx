import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {
  selectDeleteOrderLoading,
  selectOrders,
  selectOrdersLoading
} from "../../store/ordersSlice";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";
import {OrderDish} from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import {DELIVERY_PRICE} from "../../constants";
import "../User/User.css";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";
import {deleteOrder, fetchOrders} from "../../store/ordersThunks";

const Orders = () => {
  const dispatch = useAppDispatch();
  const orders = useAppSelector(selectOrders);
  const ordersLoading = useAppSelector(selectOrdersLoading);
  const deleteLoading = useAppSelector(selectDeleteOrderLoading);

  const completeOrder = async (id: string) => {
    await dispatch(deleteOrder(id));
    await dispatch(fetchOrders());
  }

  useEffect( () => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const getTotalPrice = (order: OrderDish[]) => {
    return order.reduce((sum, orderDish) => {
      return sum + orderDish.amount * orderDish.price;
    }, 0);
  }

  return (
    <div>
      <AdminNavbar/>
      <div className="container">
        <h4 className="mb-4">Orders</h4>
        <div className="">
          {ordersLoading ? <Spinner/> : orders.map(order => (
            <div key={order.orderId} className="card mb-3 order-width">
              <div className="card-body d-flex justify-content-between">
                <div className="mb-2">
                  <div className="d-flex justify-content-between">
                    <span className="me-3">Name: </span>
                    <b>{order.customer.name}</b>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="me-3">Address: </span>
                    <b>{order.customer.address}</b>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span className="">Phone: </span>
                    <b>{order.customer.phone}</b>
                  </div>
                </div>
                <div className="dishes-width">
                  {order.dishes.map(dish => (
                    <div key={dish.id} className="d-flex justify-content-between">
                      <span>{dish.amount} x {dish.name}</span>
                      <span className="fw-bold">{dish.amount * dish.price} KGZ</span>
                    </div>
                  ))}
                  <div className="d-flex justify-content-between">
                    <span>Delivery</span>
                    <span className="fw-bold">{DELIVERY_PRICE} KGZ</span>
                  </div>
                </div>
                <div>
                  <p className="m-0">Order total:</p>
                  <p className="m-0 fw-bold">{getTotalPrice(order.dishes)} KGZ</p>
                  <button className="btn btn-success"
                          onClick={() => completeOrder(order.orderId)}
                          disabled={deleteLoading ? deleteLoading === order.orderId : false}
                  >{deleteLoading && deleteLoading === order.orderId && <ButtonSpinner/>}Complete order</button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Orders;