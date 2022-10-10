/** @format */

import React, { useEffect, useState } from "react";
import "./feed.css";
import InputOption from "../../components/InputOption/InputOption";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Post from "../../components/Post/Post";
import { db } from "../../Firebase/firebase";
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore/lite";
import { selectUser } from "../../redux/features/userSlice";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import { Avatar } from "@mui/material";

const Feed = () => {
  const user = useSelector(selectUser);
  const [inputData, setInputData] = useState("");
  const [posts, setPosts] = useState([]);
  const [num, setNum] = useState(0);

  useEffect(() => {
    getDocs(query(collection(db, "posts"), orderBy("createdAt", "desc"))).then(
      (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );
  }, [num]);

  const sharePost = (e) => {
    e.preventDefault();
    addDoc(collection(db, "posts"), {
      name: user.fullName,
      description: user.email,
      message: inputData,
      photoUrl: user.profilePic,
      createdAt: serverTimestamp(),
    });
    setInputData("");
    setNum((prev) => prev + 1);
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <Avatar src={user?.profilePic}>
            {!user?.profilePic && user.fullName[0]}
          </Avatar>
          <form action="">
            <input
              type="text"
              placeholder="Post a picture from school or work"
              value={inputData || ""}
              onChange={(e) => setInputData(e.target.value)}
            />
            <button type="submit" onClick={sharePost}></button>
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
      <FlipMove>
        {posts.map(({ id, data: { name, description, message, photoUrl } }) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
          />
        ))}
      </FlipMove>
    </div>
  );
};

export default Feed;
