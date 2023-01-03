import React from 'react';
import DishForm from "../../components/DishForm/DishForm";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDishCreateLoading} from "../../store/dishesSlice";
import {createDish} from "../../store/dishesThunks";
import {ApiDish} from "../../types";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";


const NewDish: React.FC = () => {
  const dispatch = useAppDispatch();
  const createLoading = useAppSelector(selectDishCreateLoading);

  const onSubmit = async (dish: ApiDish) => {
    await dispatch(createDish(dish));
  }

  return (
    <>
      <AdminNavbar/>
      <div className="row mt-2">
        <div className="col">
          <DishForm onSubmit={onSubmit} isLoading={createLoading}/>
        </div>
      </div>
    </>
  );
};

export default NewDish;