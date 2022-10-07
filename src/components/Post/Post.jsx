import { Avatar } from "@mui/material";
import InputOption from "../InputOption/InputOption";
import "./Post.css";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

const Post = ({ name, description, message, photoUrl }) => {
  return (
    <div className="post">
      <div className="post__header">
        <Avatar src={photoUrl} />
        <div className="post__info">
          <h2>{name}</h2>
          <p>{description}</p>
        </div>
      </div>

      <div className="post__body">
        <p>{message}</p>
      </div>

      <div className="post__buttons">
        <InputOption Icon={ThumbUpAltOutlinedIcon} text="Like" color='gray'/>
        <InputOption Icon={ChatOutlinedIcon} text="Comment" color='gray'/>
        <InputOption Icon={ShareOutlinedIcon} text="Share" color='gray'/>
        <InputOption Icon={SendOutlinedIcon} text="Send" color='gray'/>
      </div>
    </div>
  );
};

export default Post;
