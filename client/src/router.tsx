import { createBrowserRouter } from "react-router-dom";
import { Home } from "./pages/Home";
import { Layout } from "./pages/Layout";
import { Checkout } from "./pages/Checkout";
import { Products } from "./pages/Products";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { PaymentResult } from "./pages/PaymentResult";
import { Orders } from "./pages/Orders";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home />, index: true },
      { path: "/Products", element: <Products /> },
      { path: "/checkout", element: <Checkout /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/payment-result", element: <PaymentResult /> },
      { path: "/orders", element: <Orders /> }
    ],
  },
]);
