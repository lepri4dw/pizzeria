import React from 'react';
import {Route, Routes} from "react-router-dom";
import Admin from "./containers/Admin/Admin";
import NewDish from "./containers/NewDish/NewDish";
import EditDish from "./containers/EditDish/EditDish";
import User from "./containers/User/User";
import Orders from "./containers/Orders/Orders";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/admin" element={(<Admin/>)}/>
        <Route path="/admin/dishes" element={(<Admin/>)}/>
        <Route path="/admin/new-dish" element={(<NewDish/>)}/>
        <Route path="/admin/edit-dish/:id" element={(<EditDish/>)}/>
        <Route path="/admin/orders" element={(<Orders/>)}/>
        <Route path="/" element={(<User/>)}/>
      </Routes>
    </div>
  );
}

export default App;
