import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Home from "./pages/Home";
// import About from "./pages/About";
import Sidebar from "./pages/sidebar/Sidebar";
import Home from "./pages/home/Home";
import About from "./pages/About";
import ErrorPage from "./pages/error/ErrorPage";
import Analytics from "./pages/analytics/Analytics";
import Reviews from "./pages/reviews/Reviews";
import Customers from "./pages/users/customers/Customers";
import Seller from "./pages/users/seller/Seller";
import Products from "./pages/product/Products";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Sidebar />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard/analytics",
        element: <Analytics />,
      },
      {
        path: "/dashboard/reviews",
        element: <Reviews />,
      },
      {
        path: "/dashboard/users/customers",
        element: <Customers />,
      },
      {
        path: "/dashboard/users/sellers",
        element: <Seller />,
      },
      {
        path: "/dashboard/products",
        element: <Products />,
      },
    ],
    // element: <div>Hello word</div>,
  },
]);
function App() {
  return (
    <>
      {/* <Routes> */}
      {/* <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} /> */}
      <RouterProvider router={router} />
      {/* </Routes> */}
    </>
  );
}

export default App;
