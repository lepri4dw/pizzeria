import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectDishDeleteLoading, selectDishes, selectDishesFetchLoading} from "../../store/dishesSlice";
import {deleteDish, fetchDishes} from "../../store/dishesThunks";
import Spinner from "../../components/Spinner/Spinner";
import AdminDishItem from "../../components/AdminDishItem/AdminDishItem";
import AdminNavbar from "../../components/AdminNavbar/AdminNavbar";

const Admin = () => {
  const dispatch = useAppDispatch();
  const dishes = useAppSelector(selectDishes);
  const fetchLoading = useAppSelector(selectDishesFetchLoading);
  const deleteLoading = useAppSelector(selectDishDeleteLoading);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch])

  const removeDish = async (id: string) => {
      await dispatch(deleteDish(id));
      await dispatch(fetchDishes());
  };

  return (
    <>
      <AdminNavbar/>
      <div className="container">
        <h4>Dishes</h4>
        {fetchLoading ? <Spinner/> :dishes.map((dish) => (
          <AdminDishItem
            key={dish.id}
            dish={dish}
            onDelete={() => removeDish(dish.id)}
            deleteLoading={deleteLoading}
          />
        ))}
      </div>
    </>
  );
};

export default Admin;