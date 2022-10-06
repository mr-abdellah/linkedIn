import React from "react";
import CreateIcon from "@mui/icons-material/Create";
import "./feed.css";
import InputOption from "../../components/InputOption/InputOption";
import ImageIcon from "@mui/icons-material/Image";

const Feed = () => {
  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
          <form action="">
            <input
              type="text"
              placeholder="Post a picture from school or work"
            />
            <button type="submit"></button>
          </form>
        </div>

        <div className="feed__inputOptions">
          <InputOption Icon={ImageIcon}  text='photo' color='#378fe9'/>
        </div>
      </div>
    </div>
  );
};

export default Feed;
