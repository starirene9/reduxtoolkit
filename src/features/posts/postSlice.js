import {createAsyncThunk, createSlice, nanoid} from "@reduxjs/toolkit";
import axios from "axios";
import {sub} from "date-fns";

// const initialState = [
//     {
//         id: '1',
//         title: 'Learning Redux Toolkit',
//         content: 'Help me Lord!',
//         date: sub(new Date(), {minutes: 10}).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     },
//     {
//         id: '2',
//         title: 'Slices',
//         content: ' I know only ham slices or cheese..',
//         date: sub(new Date(), {minutes: 5}).toISOString(),
//         reactions: {
//             thumbsUp: 0,
//             wow: 0,
//             heart: 0,
//             rocket: 0,
//             coffee: 0
//         }
//     },
// ]

//thunk middleware
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts: [],
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
}

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
    const response = await axios.get(POSTS_URL)
    return response.data
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost) => {
    const response = await axios.post(POSTS_URL, initialPost)
    return response.data
})

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.posts.push(action.payload) // 새 게시물을 추가
            },
            prepare(title, content, userId) { // 사용자가 전달하는 인수를 받아서 실제 액션 객체를 생성하고 반환
                return {
                    payload: { // 액션에 대한 데이터를 포함하는 객체
                        id: nanoid(), // 고유한 ID를 생성
                        title, // 게시물 제목을 사용자가 전달한 값으로 설정
                        content, // 게시물 내용을 사용자가 전달한 값으로 설정
                        date: new Date().toISOString(), // 현재 날짜와 시간을 ISO 문자열로 설정
                        userId,  // 사용자 ID를 사용자가 전달한 값으로 설정
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                }
            }
        },
        reactionAdded(state, action) {
            const {postId, reaction} = action.payload //deconstruct
            const existingPost = state.posts.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    },
    // thunk 부분
    extraReducers(builder) {
        builder
            .addCase(fetchPosts.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                // Adding date and recations : json 데이터에 이게 없음
                let min = 1;
                const loadedPosts = action.payload.map(post => {
                    post.date = sub(new Date(), {minutes: min++}).toISOString();
                    post.reactions = {
                        thumbsUp: 0,
                        wow: 0,
                        heart: 0,
                        rocket: 0,
                        coffee: 0
                    }
                    return post;
                });
                // Add any fetched posts to the array
                state.posts = state.posts.concat(loadedPosts)
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewPost.fulfilled, (state, action) => {
                action.payload.userId = Number(action.payload.userId)
                action.payload.date = new Date().toISOString();
                action.payload.reactions = {
                    thumbsUp: 0,
                    hooray: 0,
                    heart: 0,
                    rocket: 0,
                    eyes: 0
                }
                console.log(action.payload)
                state.posts.push(action.payload)
            })
    }
})

export const selectAllPosts = (state) => state.posts.posts; // 이런 식으로 변경 되어도 내보내기 추천함
export const getPostsStatus = (state) => state.posts.status; // 이런 식으로 변경 되어도 내보내기 추천함
export const getPostsError = (state) => state.posts.error; // 이런 식으로 변경 되어도 내보내기 추천함

export const {postAdded, reactionAdded} = postsSlice.actions
export default postsSlice

// imported 한 것들
// npm i date-fns
// npm i axios

