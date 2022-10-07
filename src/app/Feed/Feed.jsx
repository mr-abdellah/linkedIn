import React, { useEffect, useState } from "react";
import CreateIcon from "@mui/icons-material/Create";
import "./feed.css";
import InputOption from "../../components/InputOption/InputOption";
import ImageIcon from "@mui/icons-material/Image";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CalendarViewDayIcon from "@mui/icons-material/CalendarViewDay";
import Post from "../../components/Post/Post";
import { db } from "../../auth/firebase";
import { addDoc, collection, getDocs, orderBy, query, serverTimestamp } from "firebase/firestore/lite";

const Feed = () => {
  const [inputData, setInputData] = useState("");

  const [posts, setPosts] = useState([]);

  

  useEffect(() => {
    getDocs(query(collection(db, "posts"),orderBy("createdAt", "desc"))).then((snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        })),
      );
    });
  }, [posts]);

  const sharePost = (e) => {
    e.preventDefault();
    addDoc(collection(db, "posts"), {
      name: "Abdellah",
      description: "Junior web developer",
      message: inputData,
      photoUrl: "",
      createdAt: serverTimestamp()
    });
    setInputData("");
  };

  return (
    <div className="feed">
      <div className="feed__inputContainer">
        <div className="feed__input">
          <CreateIcon />
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

      {posts.length > 0 &&
        posts?.map(({id, data:{name,description,message,photoUrl}}) => (
          <Post
            key={id}
            name={name}
            description={description}
            message={message}
            photoUrl={photoUrl}
          />
        ))}
    </div>
  );
};

export default Feed;
