import { useSelector } from "react-redux";
import { selectUser } from "./../../redux/features/userSlice";
import { useParams } from "react-router-dom";
import "./profile.css";
import FlipMove from "react-flip-move";
import Post from "../../components/Post/Post";
import { useState } from "react";
import { useEffect } from "react";
import { getPosts } from "../../Firebase/firebase";

const Profile = () => {
  const { fullName } = useParams();
  const user = useSelector(selectUser);

  console.log(user);

  const [posts, setPosts] = useState([]);

  console.log(posts);

  useEffect(() => {
    getPosts(setPosts);
  }, []);

  return (
    <>
      {fullName === user.fullName ? (
        <div className="profile">
          <div className="profile__info">
            <div className="profile__coverImage">
              <img
                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z3JhZGllbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=1000&q=60"
                alt=""
              />
            </div>
            <div className="profile__picture">
              <img src={user.profilePic} alt="" />
            </div>

            <h3 className="profile__name">{user.fullName}</h3>
            <p className="profile__description">{user.email}</p>

            <div className="profile__editBtns">
              <button>Open to</button>
              <button>Add profile section</button>
              <button>More</button>
            </div>
          </div>
        </div>
      ) : (
        <h1>Error</h1>
      )}

      <div className="profile__posts">
        <FlipMove>
          {posts
            ?.filter((e) => e.data.userID === user.uid)
            .map(({ id, data: { name, description, message, photoUrl } }) => (
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
    </>
  );
};

export default Profile;
