import React from "react";
import { useParams } from 'react-router-dom'
import axios from '../axios'
import { Post } from "../components/Post";
import { AddComment} from "../components/AddComment";
import { Comment } from "./Comment/Comment";
import { useSelector } from 'react-redux'

export const FullPost = () => {
  const userData = useSelector((state) => state.auth.data);
  const isAdmin = userData?.admin === "true";
  const { id } = useParams();
  const [data, setData] = React.useState();
  const [isLoading, setLoading] = React.useState(true);
  const [comments, setComments] = React.useState();
  React.useEffect(() => {
    axios.get(`/posts/${id}`).then(res => {
      setData(res.data);
      setLoading(false);
    })
      .catch((err) => {
        console.log(err);
        alert("Ошибка получения поста")
      });
    axios.get(`/comments/${id}`).then(res => {
      setComments(res.data);
    })
      .catch((err) => {
        console.log(err);
        alert("Ошибка получения комментариев")
      });
  }, [])
  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />
  }
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl || 'image'}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.length}
        tags={data.tags}
        isFullPost
      >
      </Post>
      {comments.map((item,index) => <Comment isEditable={isAdmin || userData?.fullName === item.author}  
      _id={item._id} text={item.text} author={item.author} postedAt={item.postedAt} key={index}/>)}
      <AddComment/>
    </>
  );
};
