import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useForm } from 'react-hook-form'
import styles from "./Login.module.scss";
import { useDispatch, useSelector } from 'react-redux'
import { authSelector, fetchAuth } from "../../redux/slices/auth";
import { Navigate } from 'react-router-dom'
export const Login = () => {
  const isAuth = useSelector(authSelector)
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: "onChange"
  })
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values))
    if (!data.payload) {
      return alert("Не удалось авторизоваться");
    }
    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }
  if (isAuth) return <Navigate to='/' />
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          type="email"
          {...register('email', { required: 'Укажите почту' })}
          fullWidth
        />
        <TextField className={styles.field} label="Пароль" fullWidth
          {...register('password', { required: 'Укажите пароль' })}
          helperText={errors.password?.message}
          error={Boolean(errors.email?.message)}
          type='password'
        />
        <button disabled={!isValid} type="submit" className={styles.enter} fullWidth>
          Войти
        </button>
      </form>
    </Paper>
  );
};
