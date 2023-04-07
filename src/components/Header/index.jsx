import React from 'react';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { useDispatch, useSelector } from 'react-redux'
import Container from '@mui/material/Container';
import { authSelector, logout } from '../../redux/slices/auth';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(authSelector);

  const onClickLogout = () => {
    if (window.confirm("Вы уверены, что хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <NavLink className={styles.logo} to="/">
            <div>FAQ</div>
          </NavLink>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <NavLink to="/add-post" >
                  <Button>Создать пост</Button>
                </NavLink>
                <Button onClick={onClickLogout} className={styles.out}>
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <NavLink to="/login">
                  <button className={styles.out}>Войти</button>
                </NavLink>
                <NavLink to="/register">
                  <button >Создать аккаунт</button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
