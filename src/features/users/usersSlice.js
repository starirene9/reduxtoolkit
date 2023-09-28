import {createSlice} from "@reduxjs/toolkit";

const initialState = [
    {id: '0', name: 'Bitna Gu'},
    {id: '1', name: 'Jeongwoo Lyo'},
    {id: '2', name: 'Sarang Lyo'},
    {id: '3', name: 'Jangun Lyo'},
]

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {}
})

export const selectAllUsers = (state) => state.users; // 여기서 미리
export default usersSlice