import React, {useState} from 'react';
import {addNewPost} from "./postSlice";
import {useDispatch, useSelector} from "react-redux";
import {selectAllUsers} from "../users/usersSlice";

const AddPostForm = () => {
    const dispatch = useDispatch();

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [userId, setUserId] = useState('')
    const [addRequestStatus, setAddRequestStatus] = useState('idle')

    const users = useSelector(selectAllUsers)
    const onTitleChanged = e => setTitle(e.target.value)
    const onContentChanged = e => setContent(e.target.value)
    const onAuthorChanged = e => setUserId(e.target.value)

    const canSave = [title, content, userId].every(Boolean) && addRequestStatus === 'idle';

    const onSavePostClicked = () => {
        if (canSave) {
            try {
                setAddRequestStatus('pending')
                dispatch(addNewPost({title, body: content, userId})).unwrap()
                //  하단의 value 값들을 전달
                // .unwrap()은 retun promise, 에러나오면 던짐
                //  Redux Toolkit은 'pending' 상태에 해당하는 액션을 생성하고 상태를 업데이트 :  비동기 작업의 진행 상태를 나타내고 관리
                setTitle('')
                setContent('')
                setUserId('')
                // 입력 폼의 값을 초기화
            } catch (err) {
                console.error('Failed to save the post', err)
            } finally {
                setAddRequestStatus('idle')
                // idle'로 설정하여 비동기 작업이 완료되었음을 나타냅니다.
            }
        }
    }


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