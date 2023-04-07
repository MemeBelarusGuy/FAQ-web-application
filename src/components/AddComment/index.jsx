import React from "react";

import styles from "./AddComment.module.scss";
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/auth';
import TextField from "@mui/material/TextField";
import image from './noname.png'
import axios from '../../axios';

export const AddComment = (props) => {
  const { id } = useParams();
  const userData = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  const isAuth = useSelector(authSelector);
  const [text, setText] = React.useState("");
  const postComment = async () => {
    try {
      const fields={
        author:userData.fullName,
        text
      }
      await axios.post(`/posts/${id}`,fields);
      alert("Комментарий Добавлен!");
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Не удалось добавить комментарий");
    }
  }
  const toLogin=()=>{
    navigate('/login');
  }
  return (
    <>
      <div className={styles.root}>
        <img src={image} className={styles.avatar} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            className={styles.input}
            maxRows={10}
            multiline
            fullWidth
            value={text}
            onChange={(event) => { setText(event.target.value) }}
          />
          <button onClick={isAuth?postComment:toLogin} className={styles.send}>{isAuth ? "Отправить" : "Авторизация"}</button>
        </div>
      </div>
    </>
  );
};
