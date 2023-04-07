import React from "react";
import styles from './Comment.module.scss'
import image from './noname.png'

import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import axios from '../../axios';
import {useSelector } from 'react-redux'

export const Comment = (props) => {
    const userData = useSelector((state) => state.auth.data);
    const date = new Date(Number(props.postedAt));
    let hours = date.getHours();
    let minutes = date.getMinutes();
    if (hours < 10) hours = "0" + hours;
    if (minutes < 10) minutes = "0" + minutes;
    const [text, setText] = React.useState(props.text);
    const onClickRemove = async (event) => {
        const commentId = event.target.closest('[name="post"]').getAttribute('_id');
        if (window.confirm("Вы действительно хотите удалить комментарий?")) {
            try {
                await axios.delete(`/comments/${commentId}`);
                alert("Комментарий удалён");
                window.location.reload();
            } catch (error) {
                console.log(error);
                alert("Ошибка удаления");
            }
        }
    };
    //props._id -- id комментария
    const editComment = (event) => {
        const elem = event.target.closest('[name="post"]').querySelector('textarea');
        const saveButton = event.target.closest('[name="post"]').querySelector('[name="save"]');
        const cancelButton = event.target.closest('[name="post"]').querySelector('[name="cancel"]');
        elem.style.opacity=1;
        saveButton.style.opacity=1;
        cancelButton.style.opacity=1;
    }
    const stopEditComment=(event)=>{
        const elem = event.target.closest('[name="post"]').querySelector('textarea');
        const saveButton = event.target.closest('[name="post"]').querySelector('[name="save"]');
        const cancelButton = event.target.closest('[name="post"]').querySelector('[name="cancel"]');
        elem.style.opacity=0;
        saveButton.style.opacity=0;
        cancelButton.style.opacity=0;
    }
    const saveComment=async()=>{
        try {
            const fields={
                author:userData.fullName,
                text
            }
            await axios.patch(`/comments/${props._id}`,fields);
            alert("Комментарий обновлён!");
            window.location.reload();
        } catch (error) {
            console.log(error);
            alert("Ошибка обновления комментария")
        }
    }
    return (
        <div className={styles.comment} _id={props._id} name="post">
            {props.isEditable && (
                <div className={styles.editButtons}>
                    <IconButton onClick={editComment} color="primary">
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={onClickRemove} color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </div>
            )}
            <img src={image} className={styles.avatar} />
            <span className={styles.username}>{props.author}</span>
            <div className={styles.text}>{props.text}</div>
            <textarea value={text} onChange={(event) => { setText(event.target.value) }} className={styles.edit}></textarea>
            <button name="save" className={styles.save} onClick={saveComment}>Сохранить</button>
            <button name="cancel" className={styles.cancel} onClick={stopEditComment}>Отмена</button>
            <span className={styles.postedAt}>{hours + ":" + minutes + ",   "
                + date.getDay() + " " + date.toLocaleString('en-US', { month: 'long' }) + " " + date.getFullYear()}</span>
        </div>
    )
}