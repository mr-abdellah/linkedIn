import "./app.css";
import Header from "./app/Header/Header";
import Sidebar from "./app/Sidebar/Sidebar";
import Feed from "./app/Feed/Feed";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./redux/features/userSlice";
import Login from "./pages/Login/Login";
import { useEffect } from "react";
import { auth } from "./Firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        dispatch(login({
          fullName: userAuth.displayName,
          profilePic: userAuth.photoURL,
          email: userAuth.email,
          uid: userAuth.uid,
        }))
      } else {
        dispatch(logout());
      }
    });
    // eslint-disable-next-line 
  },[]);

  return (
    <div className="app">
      <Header />

      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <Sidebar />
          <Feed />
        </div>
      )}
    </div>
  );
}

export default App;
