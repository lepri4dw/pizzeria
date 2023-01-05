import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDishes, selectDishesFetchLoading} from "../../store/dishesSlice";
import {fetchDishes} from "../../store/dishesThunks";
import {Link} from "react-router-dom";
import './User.css';
import Spinner from "../../components/Spinner/Spinner";
import {addDish, deleteCartDish, resetCart, selectCartDishes} from "../../store/cartSlice";
import Modal from "../../components/Modal/Modal";
import {TrashFill} from "react-bootstrap-icons";
import {DELIVERY_PRICE} from "../../constants";
import {ApiOrder} from "../../types";
import {selectOrderCreateLoading} from "../../store/ordersSlice";
import ButtonSpinner from "../../components/Spinner/ButtonSpinner";
import {createOrder} from "../../store/ordersThunks";

const User = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const fetchLoading = useAppSelector(selectDishesFetchLoading);
  const cart = useAppSelector(selectCartDishes);
  const fetchCreateLoading = useAppSelector(selectOrderCreateLoading);
  const [showModal, setShowModal] = useState(false);
  const cancel = () => setShowModal(false);
  const total = cart.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.dish.price;
  }, 0);

  const newOrderCreate = async () => {
    const order: ApiOrder = {};
    cart.forEach(cartDish => {
      order[cartDish.dish.id] = cartDish.amount;
    });
    await dispatch(createOrder(order));
    await dispatch(resetCart());
    await cancel();
  }

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);
  console.log(dishes);

  useEffect(() => {
    if (cart.length === 0) {
      cancel();
    }
  }, [cart])

  return (
    <>
      <header className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
        <div className="container">
          <Link to="/" className="navbar-brand">Turtle pizza</Link>
        </div>
      </header>
      <div className="container">
        {fetchLoading ? <Spinner/> :
          <div className="d-flex justify-content-between flex-wrap">
            {dishes.map(dish => (
              <div key={dish.id} className="card column-width mb-3 fw-bold fs-4" onClick={() => dispatch(addDish(dish))}>
                <div className="card-body d-flex justify-content-between">
                  <div className="">
                    <img
                      src={dish.image}
                      alt={dish.name} width="150" height="150" className="d-block"
                    />
                  </div>
                  <span className="my-auto px-1">{dish.name}</span>
                  <span className="my-auto px-1">{dish.price} KGZ</span>
                </div>
              </div>
            ))}
          </div>
        }
      </div>
      {cart.length !== 0 &&
        <div className="border-top border-dark border-2">
          <div className="container mb-3">
            <div className="d-flex justify-content-between mt-3 fw-bold fs-2">
              <span>Total order price: {total} KGZ</span>
              <button className="btn btn-primary" onClick={() => setShowModal(true)}>Checkout</button>
            </div>
          </div>
        </div>
      }
      <Modal show={showModal} title="Your order" onClose={cancel}>
        <div className="px-3 my-3">
          {cart.map(cartDish => (
            <div className="mb-2 w-75" key={cartDish.dish.id} >
              <div className="row align-items-center">
                <div className="col">{cartDish.dish.name}</div>
                <div className="col-2">x{cartDish.amount}</div>
                <div className="col-4 text-right fw-bold">{cartDish.dish.price * cartDish.amount} KGS</div>
                <div className="col-2" onClick={() => dispatch(deleteCartDish(cartDish.dish.id))}><TrashFill size={25}/></div>
              </div>
            </div>
          ))}
          <div>Delivery: <span className="ms-4 fw-bold">{DELIVERY_PRICE} KGZ</span> </div>
          <div>Total: <span className=" ms-4 fw-bold">{total + DELIVERY_PRICE} KGZ</span></div>
        </div>
        <div className="d-flex justify-content-end mb-2">
          <button className="btn btn-danger me-2" onClick={cancel}>Cancel</button>
          <button className="btn btn-primary me-3" onClick={newOrderCreate} disabled={fetchCreateLoading}>{fetchCreateLoading && <ButtonSpinner/>}Order</button>
        </div>
      </Modal>
    </>
  );
};

export default User;