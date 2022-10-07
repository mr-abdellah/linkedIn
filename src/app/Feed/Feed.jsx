import React from "react";
import CreateIcon from "@mui/icons-material/Create";
import "./feed.css";
import InputOption from "../../components/InputOption/InputOption";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Post from "../../components/Post/Post";

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
          <InputOption Icon={ImageIcon} text="Photo" color="#378fe9" />
          <InputOption Icon={SubscriptionsIcon} text="Video" color="#E7A33E" />
          <InputOption Icon={EventNoteIcon} text="Event" color="#C0CBCD" />
          <InputOption
            Icon={CalendarViewDayIcon}
            text="Write article"
            color="#7FC15E"
          />
        </div>
      </div>

      {/* Posts section */}

      <Post
        name="Abdellah Belkaid"
        description="this is a linkedin post test description"
        message='Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis doloremque commodi, nobis placeat aliquam a magni voluptates aliquid fugit accusantium voluptatum vero quos maiores quis architecto ad voluptas, fuga soluta?'
        photoUrl='https://img.icons8.com/color/344/circled-user-male-skin-type-3--v1.png'
      />
    </div>
  );
};

export default Feed;
