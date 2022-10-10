/** @format */

import { Avatar } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import "./HeaderOption.css";

const HeaderOption = ({ avatar, Icon, title }) => {
  const [width, setWidth] = useState("");

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });
  }, []);

  return (
    <div className="headerOption">
      {Icon && <Icon className="headerOption__icon" />}
      {avatar && <Avatar className="headerOption__icon" src={avatar} />}
      {width > 820 && <h3 className="headerOption__title">{title}</h3>}
    </div>
  );
};

export default HeaderOption;
