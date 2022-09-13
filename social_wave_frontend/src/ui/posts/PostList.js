import axios from "axios";
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import '../../styling/posts/PostList.css';
const PostList =({posts, user}) =>{
    const navigate = useNavigate()
    const [postsView,setPosts] = useState(posts)
    const replacePost = ( post ) => {
        const result = postsView.reduce( (acc,e)=>{ return e._id === post._id ? [...acc,post] : [...acc,e] } ,[])
        setPosts(result)
    }

    const getPosts = ()=>{
        axios
        .get('http://localhost:5000/posts/get')
        .then(res=>setPosts(res.data))
        .catch(err=>console.log(err))
    }

    const likePost = (post_id)=>{
        axios
        .post('http://localhost:5000/posts/like',{post_id: post_id, user_id: user._id})
        .then(res=>replacePost(res.data))
        .catch(err=>console.log(err))
    }
    useEffect(()=>{if(!postsView){getPosts()}})

    return(
        <div>
            { postsView && postsView.map(post=>
            (<div key={post._id} className='post-box'>
                <div className="owner-info" onClick={()=>{navigate(`${post.owner.username}`)}}>
                    { post.owner && post.owner.image ? <img className="user-icon"></img> : <img className="user-icon" src="/default-avatar.png"></img> }
                    <div>{post.owner.first_name} {post.owner.last_name}</div>
                </div>
                <div className="post-content">
                    <div>{post.text}</div>
                    <div>{post.image ? <img src={post.image}></img> : <></>}</div>
                </div>
                <div className="post-interactions">
                    <div>
                    <img className="like-icon" src="/like.png" onClick={()=>{likePost(post._id)}}></img>
                    <div>{ post.likes.length}</div>
                    </div>
                </div>
            </div>))}
        </div>
    )

}
export default PostList;