import React from 'react';
import Grid from '@mui/material/Grid';
import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, fetchTags } from '../redux/slices/posts';
import { NavLink } from 'react-router-dom';
import styles from './Home.module.scss'

export const PopularPosts = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const { posts, tags } = useSelector((state) => state.posts);
  const postsItems = [...posts.items];
  const popularPosts = postsItems.sort((a, b) => a.viewsCount < b.viewsCount ? 1 : -1);
  const isAdmin = userData?.admin === "true";
  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';
  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);
  return (
    <div>
      <div className={styles.links}>
        <NavLink to='/' className={item => item.isActive ? `${styles.active} ${styles.link}` : styles.link}>Актуальные</NavLink>
        <NavLink to='/popular' className={item => item.isActive ? `${styles.active} ${styles.link}` : styles.link}>Популярные</NavLink>
      </div>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : popularPosts).map((obj, index) =>
            isPostsLoading ? (<Post isLoading={isPostsLoading} key={index} />) : (
              <Post
                _id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl || 'image'}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={0}
                tags={obj.tags}
                isEditable={isAdmin || userData?._id === obj.user._id}//изменять может только владелец статьи
                key={index}
              />
            ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </div>
  );
};
