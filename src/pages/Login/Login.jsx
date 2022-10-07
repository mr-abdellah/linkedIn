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
  const currentUser = auth.currentUser;

  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
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
            uid: userAuth.uid,
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
      await updateProfile(currentUser, {
        displayName: fullName,
        photoURL: profilePic,
      });
      console.log(currentUser);
      await dispatch(
        login({
          fullName: currentUser?.displayName,
          profilePic: currentUser?.photoURL,
          email: currentUser?.email,
          uid: currentUser.uid,
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
