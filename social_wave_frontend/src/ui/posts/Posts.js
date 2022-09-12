import PostForm from "./PostForm";
import '../../styling/posts/Posts.css';
import { useEffect, useState } from "react";
import axios from "axios";
const Posts = ({posts,user}) => {
    const [postsView,setPosts] = useState(posts)
    const getPosts = ()=>{
        axios
        .get('http://localhost:5000/posts/get')
        .then(res=>setPosts(res.data))
        .catch(err=>console.log(err))
    }
    useEffect(()=>{getPosts()},[])
    console.log(postsView)
    return ( 
    <div className="posts-wrapper">
        <div className="posts">
        <PostForm user={user}/>
        { postsView && postsView.map(post=>
            (<div key={post._id} className='post-box'>
                <div>
                    <div>{post.owner.first_name} {post.owner.last_name}</div>
                    <div>{post.text}</div>
                </div>
                <div>{post.image ? <img src={post.image}></img> : <></>}</div>
            </div>))}
        </div>
    </div>
    )
}

export default Posts;