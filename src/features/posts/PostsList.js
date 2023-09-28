import React from 'react';
import {useSelector} from "react-redux";
import {selectAllPosts} from "./postSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./ReactionButtons";

const PostsList = () => {

    const posts = useSelector(selectAllPosts) // state.post가 아니고 이렇게 데려오는게 안전

    const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
    // 이 함수를 사용하여 날짜를 비교하면 날짜를 기반으로 정렬
    // b.date와 a.date를 비교하므로 내림차순으로 정렬

    const renderedPosts = orderedPosts.map(post => (
        <article key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content.substring(0, 100)}</p>
            <p className="postCredit">
                <PostAuthor userId={post.userId}/>
                <TimeAgo timestamp={post.date}/>
            </p>
            <ReactionButtons post={post}/>
        </article>
    ))

    return (
        <section>
            <h2>Posts</h2>
            {renderedPosts}
        </section>
    );
};

export default PostsList;