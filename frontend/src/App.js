import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
import Signin from "./pages/Signin";
import Navbar from "./components/NavBar";
import Error from "./pages/Error";
export const BackendUrl ="https://twitter-4jow.onrender.com/";

const Layout = () => {
  return (
    <div className="h-14 ">
      <Navbar />
      <Outlet></Outlet>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error />,
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      // {
      //   path: "/profile/:id/signin",
      //   element: <Profile />,
      // },
      {
        path: "/explore",
        element: <Explore />,
      },
      // {
      //   path: "/explore/signin",
      //   element: <Explore />,
      // },
      {
        path: "/signin",
        element: <Signin />,
      },

      {
        path: "/signout",
        element: <Signin />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;