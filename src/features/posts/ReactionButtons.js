import React from 'react';
import {useDispatch} from "react-redux";
import {reactionAdded} from "./postSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕',
}

const ReactionButtons = ({post}) => {
    const dispatch = useDispatch()
    // Object.entries(reactionEmoji)를 사용하여 객체의 키와 값을 순회하며 각각의 버튼을 만듭니다.
    const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => { //key, value
        return (
            <button
                key={name}
                type="button"
                className="reactionButton"
                onClick={() =>
                    // postId는 클릭한 버튼이 속한 게시물의 ID입니다.
                    // post.id는 ReactionButtons 컴포넌트의 prop로부터 전달된 현재 게시물의 ID를 나타냅니다.
                    dispatch(reactionAdded({postId: post.id, reaction: name}))
                }>
                {emoji} {post.reactions[name]}
            </button>
        );
    })
    return <div>{reactionButtons}</div>
};

export default ReactionButtons;
