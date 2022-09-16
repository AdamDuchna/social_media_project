import PostForm from "./PostForm";
import PostList from "./PostList";
import '../../styling/posts/Posts.css';
import axios from "axios";
const Posts = ({posts, setPosts,user}) => {
    const replacePost = ( post ) => {
        const result = posts.reduce( (acc,e)=>{ return e._id === post._id ? [...acc,post] : [...acc,e] } ,[])
        setPosts(result);
    }
    const getPosts = ()=>{
        axios
        .get('http://localhost:5000/posts/get')
        .then(res=>setPosts(res.data))
        .catch(err=>console.log(err))
    }
    return ( 
    <div className="posts-wrapper">
        <div className="posts">
        <PostForm user={user}/>
        <PostList posts={posts} setPosts={setPosts} user={user} replacePost={replacePost} getPosts={getPosts} />
        </div>
    </div>
    )
}

export default Posts;