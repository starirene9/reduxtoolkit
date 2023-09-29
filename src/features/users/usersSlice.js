import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

// const initialState = [
//     {id: '0', name: 'Bitna Gu'},
//     {id: '1', name: 'Jeongwoo Lyo'},
//     {id: '2', name: 'Sarang Lyo'},
//     {id: '3', name: 'Jangun Lyo'},
// ]

const initialState = []

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const response = await axios.get(USERS_URL);
    return response.data
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            return action.payload;
        })
    }
})

export const selectAllUsers = (state) => state.users; // 여기서 미리
export default usersSlice