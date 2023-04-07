import { configureStore } from '@reduxjs/toolkit'
import { authReducer } from './slices/auth';
import { postsReducer } from './slices/posts';

const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer
    }
})
window.store = store;
export default store;