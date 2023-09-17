import { createBrowserRouter, RouterProvider } from "react-router-dom";
import About from "./components/about/About";
import Main from "./components/body/Main";
import Resto from "./components/body/Resto";
import Cart from "./components/cart/Cart";
import Layout from "./components/Layout";

let router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <h3>Page you are trying to is not created yet</h3>,
    children: [
      {
        path: "",
        element: <Main />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "cart",
        element: <Cart />
      },
      {
        path: "/resto/:restoId",
        element: <Resto />
      }
    ]
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}
