import {configureStore} from "@reduxjs/toolkit"
import {counterSlice} from '../features/counter/counterSlice'
import postsSlice from "../features/posts/postSlice";
import usersSlice from "../features/users/usersSlice";

export const store = configureStore({
    reducer: {
        counter: counterSlice.reducer,
        posts: postsSlice.reducer,
        users: usersSlice.reducer,
    }
})