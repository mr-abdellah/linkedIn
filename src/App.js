/** @format */

import "./app.css";
import Header from "./app/Header/Header";
import Sidebar from "./app/Sidebar/Sidebar";
import Feed from "./app/Feed/Feed";
import { useDispatch, useSelector } from "react-redux";
import {
  login,
  logout,
  register,
  selectUser,
} from "./redux/features/userSlice";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useEffect, useState } from "react";
import { auth } from "./Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Widgets from "./app/Widgets/Widgets";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const dispatch = useDispatch();

  const logged = async () => {
    await onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            fullName: userAuth.displayName,
            profilePic: userAuth.photoURL,
            email: userAuth.email,
            uid: userAuth.uid,
          })
        );

        setUserLoggedIn(true);
      } else if (userAuth) {
        dispatch(
          register({
            fullName: userAuth.displayName,
            profilePic: userAuth.photoURL,
            email: userAuth.email,
            uid: userAuth.uid,
          })
        );
      } else {
        dispatch(logout());
        setUserLoggedIn(false);
      }
    });
  };

  useEffect(() => {
    logged();
  }, []);

  const Layout = () => {
    return (
      <>
        <Header />
        <div className="app__body">
          <Sidebar />
          <Outlet />
          <Widgets />
        </div>
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: userLoggedIn ? <Layout /> : <Navigate to="/login" />,
      children: [
        {
          path: "/",
          element: <Feed />,
        },
      ],
    },
    {
      path: "/login",
      element: userLoggedIn ? <Navigate to="/" /> : <Login />,
    },
    {
      path: "/register",
      element: userLoggedIn ? <Navigate to="/" /> : <Register />,
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
