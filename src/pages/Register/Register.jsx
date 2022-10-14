import "./register.css";
import LinkedInImg from "../../assets/images/linkedin.png";
import { auth } from "../../Firebase/firebase.js";
import { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { register } from "../../redux/features/userSlice";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const registerFunction = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, {
      displayName: fullName,
      photoURL: profilePic,
    })
      .then((userAuth) => {
        dispatch(
          register({
            fullName: auth.currentUser.displayName,
            profilePic: auth.currentUser.photoURL,
            email: auth.currentUser.email,
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
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          name="fullName"
          type="text"
          placeholder="Full Name"
          required
        />
        <input
          value={profilePic}
          onChange={(e) => setProfilePic(e.target.value)}
          name="profilePic"
          type="text"
          placeholder="Proofile Picture URL"
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
        <button onClick={registerFunction}>Register Now</button>
      </form>
      <p>
        Not a member?{" "}
        <Link className="login__register" to="/login">
          Sign In{" "}
        </Link>
      </p>
    </div>
  );
};

export default Register;
