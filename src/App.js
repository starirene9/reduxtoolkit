import './App.css';
import Counter from "./features/counter/Counter";
import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

function App() {
    return (
        <div className="App">
            <Counter/>
            <hr/>
            <AddPostForm/>
            <hr/>
            <PostsList/>
        </div>
    );
}

export default App;
