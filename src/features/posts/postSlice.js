import {createSlice, nanoid} from "@reduxjs/toolkit";
import {sub} from "date-fns";

const initialState = [
    {
        id: '1',
        title: 'Learning Redux Toolkit',
        content: 'Help me Lord!',
        date: sub(new Date(), {minutes: 10}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
    {
        id: '2',
        title: 'Slices',
        content: ' I know only ham slices or cheese..',
        date: sub(new Date(), {minutes: 5}).toISOString(),
        reactions: {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0
        }
    },
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload) // 새 게시물을 추가
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
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const selectAllPosts = (state) => state.posts; // 이런 식으로 변경 되어도 내보내기 추천함

export const {postAdded, reactionAdded} = postsSlice.actions;
export default postsSlice


// npm i date-fns

