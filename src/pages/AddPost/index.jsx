import React from 'react';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import SimpleMDE from 'react-simplemde-editor';//редактор

import 'easymde/dist/easymde.min.css';
import styles from './AddPost.module.scss';
import { useSelector } from 'react-redux';
import { authSelector } from '../../redux/slices/auth';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import axios from '../../axios';
export const AddPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isAuth = useSelector(authSelector);
  const [imageUrl, setImageUrl] = React.useState('');
  const [text, setText] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [tags, setTags] = React.useState('');
  const inputFileRef = React.useRef(null);
  const isEditing = Boolean(id);
  React.useEffect(() => {
    if (id) {
      axios.get(`/posts/${id}`).then(({ data }) => {
        setTitle(data.title);
        setImageUrl(data.imageUrl);
        setTags(data.tags.join(','));
        setText(data.text);
      })
    }
  }, [])

  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData();
      const file = event.target.files[0];
      formData.append('image', file);
      const { data } = await axios.post('/upload', formData);
      setImageUrl(data.url);
    } catch (error) {
      console.log(error);
      alert("Ошибка");
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl('');
  };

  const onChange = React.useCallback((value) => {
    setText(value);
  }, []);

  const onSubmit = async () => {
    try {
      const fields = {
        title,
        imageUrl,
        tags: tags.split(','),
        text
      }
      const { data } = isEditing
        ? await axios.patch(`/posts/${id}`, fields)
        : await axios.post('/posts', fields);
      const newId = isEditing ? id : data._id;
      navigate(`/posts/${newId}`)
    } catch (error) {
      console.log(error);
      alert("Ошибка при создании поста")
    }
  }

  const options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: true,
      placeholder: 'Введите текст...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );
  if (!isAuth && !localStorage.getItem('token')) {
    return <Navigate to='/' />
  }
  return (
    <Paper style={{ padding: 30 }}>
      <button onClick={() => { inputFileRef.current.click() }} className={styles.upload}>
        Загрузить изображение
      </button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <button className={styles.removeImage} onClick={onClickRemoveImage}>
            Удалить
          </button>
          <img className={styles.image} src={`http://localhost:4444${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        value={title}
        onChange={(event) => { setTitle(event.target.value) }}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(event) => { setTags(event.target.value) }}
        fullWidth />
      <SimpleMDE className={styles.editor} value={text} onChange={onChange} options={options} />
      <div className={styles.buttons}>
        <button onClick={onSubmit} className={styles.post}>
          {isEditing ? "Сохранить" : "Опубликовать"}
        </button>
        <a href="/">
          <button className={styles.cancel}>Отмена</button>
        </a>
      </div>
    </Paper>
  );
};
