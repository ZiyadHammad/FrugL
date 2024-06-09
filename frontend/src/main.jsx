import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import store from "./store.js";
import { Provider } from "react-redux";

import Layout from "./layouts/Layout";
import PrivateRoute from "./utils/PrivateRoute.jsx";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'
import Scraper from './pages/Scraper';
import MyProducts from './pages/MyProducts';

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            children: [
              {
                path: 'scraper',
                element: <Scraper />
              },
              {
                path: 'products',
                element: <MyProducts />
              }
            ]
          },
          {
            path: "settings",
            element: <Settings />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);
