/** @format */

import "./login.css";
import LinkedInImg from "../../assets/images/linkedin.png";
import { auth } from "../../Firebase/firebase";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userAuth) => {
        dispatch(
          login({
            fullName: userAuth.displayName,
            profilePic: userAuth.photoURL,
            email: userAuth.email,
          })
        );
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="login">
      <img src={LinkedInImg} alt="linkedin_img" />
      <form>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="Password"
        />
        <button onClick={loginToApp}>Sign In</button>
      </form>
      <p>
        Not a member?{" "}
        <Link className="login__register" to="/register">
          Register Now
        </Link>
      </p>
    </div>
  );
};

export default Login;
