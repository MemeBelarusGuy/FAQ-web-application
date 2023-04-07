import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, fetchRegister } from "../../redux/slices/auth"
import { useForm } from 'react-hook-form'
import { Navigate } from 'react-router-dom'
import styles from './Login.module.scss';

export const Registration = () => {
  const isAuth = useSelector(authSelector);
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      password: ''
    },
    mode: "onChange"
  })
  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values))
    if (!data.payload) {
      return alert("Не удалось создать аккаунт");
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }
  if (isAuth) return <Navigate to='/' />
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField className={styles.field} label="Полное имя" fullWidth
          error={Boolean(errors.fullName?.message)}
          helperText={errors.fullName?.message}
          {...register('fullName', { required: 'Укажите полное имя' })}
        />
        <TextField className={styles.field} label="E-Mail" fullWidth
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Укажите почту' })}
        />
        <TextField className={styles.field} label="Пароль" fullWidth
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          type="password"
          {...register('password', { required: 'Укажите пароль' })}
        />
        <button disabled={!isValid} type="submit" className={styles.enter}>
          Зарегистрироваться
        </button>
      </form>
    </Paper>
  );
};
