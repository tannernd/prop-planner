import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import "./index.css";
import Dashboard from "./pages/Dashboard.jsx";
import SignUp from "./pages/SignUp.jsx";
import AddProperty from "./pages/AddProperty.jsx";
import Property from "./pages/Property.jsx";
import Reports from "./pages/Reports.jsx";
import Unauthorized from "./pages/Unathorized.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1 className="display-2">Wrong page!</h1>,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/addproperty",
        element: <AddProperty />,
      },
      {
        path: "/property/:id",
        element: <Property />,
      },
      {
        path: "/reports/:id",
        element: <Reports />,
      },
      {
        path: "/unauthorized/",
        element: <Unauthorized />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
