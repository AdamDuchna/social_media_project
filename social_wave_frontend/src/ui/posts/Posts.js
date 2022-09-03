import PostForm from "./PostForm";
import '../../styling/posts/Posts.css';
const Posts = ({posts,user}) => {
    return ( 
    <div className="posts-wrapper">
        <div className="posts">
        <PostForm user={user}/>
        </div>
    </div>
    )
}

export default Posts;