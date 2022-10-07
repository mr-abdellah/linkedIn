import "./login.css";
import LinkedInImg from "../../assets/images/linkedin.png";
import { auth } from "../../Firebase/firebase";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../redux/features/userSlice";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const Login = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  // console.log(fullName);
  const [profilePic, setProfilePic] = useState("");
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

  const register = async () => {
    if (!fullName) {
      alert("Please enter a full name");
    } else {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: fullName,
        photoURL: profilePic,
      });
      await dispatch(
        login({
          fullName: auth.currentUser.displayName,
          profilePic: auth.currentUser.photoURL,
          email: auth.currentUser.email,
          uid: auth.currentUser.uid,
        })
      );
    }
  };

  return (
    <div className="login">
      <img src={LinkedInImg} alt="linkedin_img" />
      <form>
        <input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          name="fullName"
          type="text"
          placeholder="Full name (required if registering)"
        />
        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          name="profilePic"
          type="text"
          placeholder="Proofile Picture url (optional)"
        />
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
        <span className="login__register" onClick={register}>
          Register Now
        </span>
      </p>
    </div>
  );
};

export default Login;
