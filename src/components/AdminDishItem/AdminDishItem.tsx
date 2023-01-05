import React from 'react';
import {Link} from "react-router-dom";
import {Dish} from "../../types";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  dish: Dish;
  onDelete: React.MouseEventHandler;
  deleteLoading: false | string;
}

const AdminDishItem: React.FC<Props> = ({dish, onDelete, deleteLoading}) => {
  return (
      <div className="card w-75 mb-3 fw-bold fs-4">
        <div className="card-body d-flex justify-content-between">
            <img
              src={dish.image}
              alt={dish.name} width="150" height="150" className="d-block"
            />
          <span className="my-auto px-1">{dish.name}</span>
          <span className="my-auto px-1">{dish.price} KGZ</span>
          <div className="d-flex my-auto">
            <Link to={'/admin/edit-dish/' + dish.id} className="btn btn-primary me-3">Edit</Link>
            <button className="btn btn-danger"
                    onClick={onDelete}
                    disabled={deleteLoading ? deleteLoading === dish.id : false}
            >
              {deleteLoading && deleteLoading === dish.id && <ButtonSpinner/>}Delete
            </button>
          </div>
        </div>
      </div>
  );
};

export default AdminDishItem;