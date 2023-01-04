import React from 'react';
import {Link, NavLink} from "react-router-dom";

const AdminNavbar: React.FC = () => {
  return (
    <div className="navbar navbar-expand-sm navbar-dark bg-primary mb-3">
      <div className="container">
        <Link to="/admin" className="navbar-brand">Turtle pizza admin</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/admin/dishes" className="nav-link">
                Dishes
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/new-dish" className="nav-link">
                New Dish
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/admin/orders" className="nav-link">
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;