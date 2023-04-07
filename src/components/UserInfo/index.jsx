import React from 'react';
import styles from './UserInfo.module.scss';
import image from './noname.png'
export const UserInfo = ({ fullName, additionalText }) => {
  const date = new Date(additionalText);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  if (hours < 10) hours = "0" + hours;
  if (minutes < 10) minutes = "0" + minutes
  return (
    <div className={styles.root}>
      <img className={styles.avatar} src={image} alt={fullName} />
      <div className={styles.userDetails}>
        <span className={styles.userName}>{fullName}</span>
        <span className={styles.additional}>{hours + ":" + minutes + ",   "
          + date.getDate() + " " + date.toLocaleString('en-US', { month: 'long' }) + " " + date.getFullYear()}</span>
      </div>
    </div>
  );
};
