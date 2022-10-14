import "./app.css";
import Header from "./app/Header/Header";
import Sidebar from "./app/Sidebar/Sidebar";
import Feed from "./app/Feed/Feed";
import { useDispatch } from "react-redux";
import { login, logout, register } from "./redux/features/userSlice";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { useEffect, useState } from "react";
import { auth } from "./Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import Widgets from "./app/Widgets/Widgets";
import Profile from "./pages/Profile/Profile";
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

  useEffect(
    () => {
      logged();
    }, //eslint-disable-next-line
    []
  );

  const FeedLayout = () => {
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

  const ProfileLayout = () => {
    return (
      <>
        <Header />
        <Outlet />
      </>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: userLoggedIn ? <FeedLayout /> : <Navigate to="/login" />,
      children: [
        {
          path: "/feed",
          element: <Feed />,
        },
      ],
    },
    {
      path: "/profile",
      element: <ProfileLayout />,
      children: [
        {
          path: "/profile/:fullName",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: userLoggedIn ? <Navigate to="/feed" /> : <Login />,
    },
    {
      path: "/register",
      element: userLoggedIn ? <Navigate to="/feed" /> : <Register />,
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
