import { useEffect, useState } from 'react';
import "./App.css"
import RegisterUser from './pages/RegisterUser';
import {RouterProvider, createBrowserRouter} from "react-router-dom"
import ShowUsers from './pages/ShowUsers';
import Login from './pages/Login';
import RegisterProduct from './pages/RegisterProduct';
import ShowProduct from './pages/ShowProducts';
import Home from './pages/Home';
import 'remixicon/fonts/remixicon.css'
import ShowWishlist from "./pages/ShowWishlist.jsx"
import ShowCart from "./pages/ShowCart"
import AdminLogin from './admin-pages/AdminLogin';
import Dashboard from './admin-pages/Dashboard'

const router = createBrowserRouter([
  {
    path: "/register",
    element: <RegisterUser/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/showusers",
    element: <ShowUsers/>
  },
  {
    path: "/register-product",
    element: <RegisterProduct/>
  },
  {
    path: "showproducts",
    element: <ShowProduct/>
  },
  {
    path: "/",
    element: <Home/>
  },
  {
    path: "/:id",
    element: <Home/>
  },
  {
    path: "/wishlist",
    element: <ShowWishlist/>
  },
  {
    path: "/cart",
    element: <ShowCart/>
  },
  {
    path: "/admin",
    element: <AdminLogin/>
  },
  {
    path: '/admin-dashboard',
    element: <Dashboard/>
  }
])

function App() {

  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
