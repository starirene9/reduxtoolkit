import React, {useState} from 'react';
import {postAdded} from "./postSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectAllUsers} from "../users/usersSlice";

const AddPostForm = () => {

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')

    const users = useSelector(selectAllUsers)
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const dispatch = useDispatch();
    const onSavePostClicked = () => {
        if (title && content) { // if we have title and content value
            dispatch(
                postAdded(title, content, userId)
            )
            setTitle('')
            setContent('')
        }
    }

    const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

    const usersOptions = users.map(user => (
        <option key={user.id} value={user.id}>
            {user.name}
        </option>
    ))

    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title : </label>
                <input
                    type="text"
                    id="postTitle"
                    name="postTItle"
                    value={title}
                    onChange={onTitleChanged}
                />
                <label htmlFor="postAuthor">Author : </label>
                <select id="postAuthor" value={userId}
                        onChange={onAuthorChanged}>
                    <option value=""></option>
                    {usersOptions}
                </select>
                <label htmlFor="postContent">Content : </label>
                <textarea
                    name="postContent"
                    id="postContent"
                    cols="30" rows="10"
                    value={content}
                    onChange={onContentChanged}/>
                <button
                    type="button"
                    onClick={onSavePostClicked}
                    disabled={!canSave}
                >
                    Save Post
                </button>
            </form>
        </section>
    );
};

export default AddPostForm;