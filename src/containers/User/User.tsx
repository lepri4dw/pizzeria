import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDishes, selectDishesFetchLoading} from "../../store/dishesSlice";
import {fetchDishes} from "../../store/dishesThunks";
import {Link} from "react-router-dom";
import './User.css';
import Spinner from "../../components/Spinner/Spinner";
import {addDish, selectCartDishes} from "../../store/cartSlice";
import Modal from "../../components/Modal/Modal";

const User = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const fetchLoading = useAppSelector(selectDishesFetchLoading);
  const cart = useAppSelector(selectCartDishes);
  const [showModal, setShowModal] = useState(false);
  const cancel = () => setShowModal(prev => !prev);
  const total = cart.reduce((sum, cartDish) => {
    return sum + cartDish.amount * cartDish.dish.price;
  }, 0);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  console.log(cart);
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
      <div className="border-top border-dark border-2">
        <div className="container mb-3">
          {cart.length !== 0 &&
            <div className="d-flex justify-content-between mt-3 fw-bold fs-2">
              <span>Total order price: {total} KGZ</span>
              <button className="btn btn-primary" onClick={cancel}>Checkout</button>
            </div>
          }
        </div>
      </div>
      <Modal show={showModal} title="Your order" onClose={cancel}>

      </Modal>
    </>
  );
};

export default User;