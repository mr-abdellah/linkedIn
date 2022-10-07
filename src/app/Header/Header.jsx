import SearchIcon from "@mui/icons-material/Search";
import "./Header.css";
import HomeIcon from "@mui/icons-material/Home";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationIcon from "@mui/icons-material/Notifications";
import HeaderOption from "../../components/HeaderOption/HeaderOption";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/userSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/firebase";

const Header = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    console.log("im clicked");
    signOut(auth).then(() => {
      dispatch(logout());
    });
  };

  return (
    <div className="header">
      <div className="header__left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/3536/3536505.png"
          alt=""
        />

        <div className="header__search">
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOption title="Home" Icon={HomeIcon} />
        <HeaderOption title="My Network" Icon={SupervisorAccountIcon} />
        <HeaderOption title="Jobs" Icon={BusinessCenterIcon} />
        <HeaderOption title="Messaging" Icon={ChatIcon} />
        <HeaderOption title="Notifications" Icon={NotificationIcon} />
        <button id="logout" onClick={handleLogout}>
          <HeaderOption
            title="Abdellah"
            avatar="https://img.icons8.com/color/48/000000/circled-user-male-skin-type-6.png"
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
